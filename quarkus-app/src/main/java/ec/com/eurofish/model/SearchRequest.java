package ec.com.eurofish.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchRequest {
    Integer state;
    Integer offset;
    Integer limit;
}
