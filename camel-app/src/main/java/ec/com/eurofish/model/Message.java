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
    /*
     * {
     * "source": "e33634e1-4bbc-4b0c-aed9-d4d70431c88b",
     * "destination": "9a5f6001-4b83-42e0-b78e-6bd4f127dff3",
     * "operation": "R",
     * "verb": "POST",
     * "path": "/2c99d65c-8ef9-4aa2-814c-352a0c23b201/?vessel_lot=935-5-2024",
     * "body": null,
     * "feedback": null
     * }
     */
    String source;
    String destination;
    String operation;
    String verb;
    String path;
    JsonObject body;
    JsonObject feedback;

    public static Message test() {
        return Message.builder()
                .source("pending")
                .destination("9a5f6001-4b83-42e0-b78e-6bd4f127dff3")
                .operation("R")
                .verb("POST")
                .path("/b91ee262-e071-4af8-adae-24e374576c29/?vessels")
                .build();
    }

}
