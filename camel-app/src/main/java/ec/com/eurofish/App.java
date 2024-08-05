package ec.com.eurofish;

import javax.inject.Inject;

import org.apache.camel.Endpoint;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.cdi.Uri;

public class App extends RouteBuilder {
    @Inject
    @Uri("timer:sample?period=30000")
    private Endpoint timer;

    @Override
    public void configure() throws Exception {
        from(timer)
                .to("log:output");
    }
}
