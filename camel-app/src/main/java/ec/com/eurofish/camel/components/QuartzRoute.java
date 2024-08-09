package ec.com.eurofish.camel.components;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class QuartzRoute extends RouteBuilder {

  @Override
  public void configure() throws Exception {
    from("quartz://eu/sample?cron={{cron.one}}")
        .setBody(constant("Hello"))
        .to("log:info");
  }

}
