package ec.com.eurofish.camel.components;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.stereotype.Component;

import ec.com.eurofish.camel.model.Message;

@Component
public class VesselsRoute extends RouteBuilder {

  @Override
  public void configure() throws Exception {
    from("paho-mqtt5:{{mqtt.topic}}?brokerUrl={{mqtt.url}}&userName={{mqtt.user}}&password={{mqtt.password}}")
        .process(exchange -> exchange.getIn().setBody(Message.test()))
        .marshal().json(JsonLibrary.Jackson)
        .setHeader(Exchange.HTTP_METHOD, constant("POST"))
        .setHeader(Exchange.CONTENT_TYPE, constant("application/json"))
        .to("{{mw.url}}/message/generic")
        .log("${body}");
  }

}
