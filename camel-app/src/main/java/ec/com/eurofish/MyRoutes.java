package ec.com.eurofish;

import javax.inject.Inject;

import org.apache.camel.CamelContext;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.cdi.Uri;
import org.apache.camel.component.http.HttpMethods;
import org.apache.camel.component.properties.PropertiesComponent;
import org.apache.camel.model.dataformat.JsonLibrary;

import ec.com.eurofish.model.Message;

/**
 * Configures all our Camel routes, components, endpoints and beans
 */
public class MyRoutes extends RouteBuilder {

        @Inject
        @Uri("timer:foo?period={{timer.period}}")
        private Endpoint inputEndpoint;

        @Inject
        @Uri("elasticsearch://elasticsearch?hostAddresses=integrador.eurofish.com.ec:9200&operation=Index&indexName=haccp")
        private Endpoint resultEndpoint;

        @Inject
        @Uri("https://integrador.eurofish.com.ec:8490/v1/api/message/generic")
        private Endpoint genericEndPoint;

        @Inject
        @Uri("paho-mqtt5:blz/haccp?brokerUrl=ssl://integrador.eurofish.com.ec:8883&userName=mosquitto&password=mosquitto")
        private Endpoint haccp;

        @Inject
        CamelContext context;

        @Override
        public void configure() {
                PropertiesComponent pc = new PropertiesComponent();
                pc.setLocation("classpath:com/mycompany/myprop.properties");
                context.addComponent("properties", pc);

                context.getPropertiesComponent().setLocation("classpath:application.properties");
                // pc.setLocation("classpath:application.properties");
                // context.setPropertiesComponent(pc);
                // you can configure the route rule with Java DSL here

                // from(inputEndpoint)
                // .to("bean:counterBean")
                // .to("log:output")
                // .to(resultEndpoint)
                // .log("${body}");

                from(haccp)
                                // .log("${body}")
                                .to("log:output");

                from(inputEndpoint)
                                .process(exchange -> exchange.getIn().setBody(Message.create(
                                                "",
                                                "{{tally.destination}}",
                                                "{{tally.path}}")))
                                .marshal().json(JsonLibrary.Jackson)
                                .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.POST))
                                .setHeader(Exchange.CONTENT_TYPE, constant("application/json"))
                                .log("${body}")
                                .to(genericEndPoint)
                                .log("${body}");
        }

}
