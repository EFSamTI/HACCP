package ec.com.eurofish.model;

import org.apache.camel.util.json.JsonObject;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message {

    String source;
    String destination;
    String operation;
    String verb;
    String path;
    JsonObject body;
    JsonObject feedback;

    public static Message create(String source, String destination, String path) {
        return Message.builder()
                .source(source)
                .destination(destination)
                .operation("R")
                .verb("POST")
                .path(path)
                .build();
    }

}
