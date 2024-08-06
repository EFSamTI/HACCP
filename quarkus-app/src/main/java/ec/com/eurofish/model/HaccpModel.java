package ec.com.eurofish.model;

import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.sqlclient.Row;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HaccpModel {
    String lot;
    // Integer state;
    JsonObject body;

    public static HaccpModel from(Row row) {
        return HaccpModel.builder()
                .lot(row.getString("lot"))
                .body(row.getJsonObject("body"))
                .build();
    }
}
