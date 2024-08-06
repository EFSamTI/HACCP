package ec.com.eurofish.resource;

import ec.com.eurofish.model.HaccpModel;
import ec.com.eurofish.model.SearchRequest;
import ec.com.eurofish.model.SearchResponse;
import ec.com.eurofish.model.UpdateRequest;
import ec.com.eurofish.service.PGService;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.ResponseBuilder;

@Path("haccp")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class HaccpResource {

    @Inject
    PGService pg;

    @POST
    public Uni<Response> addLot(JsonObject json) {
        return pg.addLot(json)
                .onItem().transform(x -> Response.ok(json))
                .onItem().transform(ResponseBuilder::build);
    }

    @POST
    @Path("update-state")
    public Uni<Response> updateState(UpdateRequest request) {
        return pg.updateState(request.getLot(), request.getState())
                .onItem().transform(x -> Response.ok(x))
                .onItem().transform(ResponseBuilder::build);
    }

    @POST
    @Path("search")
    public Uni<SearchResponse<HaccpModel>> searchByState(SearchRequest request) {
        var total = pg.totalByState(request.getState());
        var data = pg.searchByState(
                request.getState(),
                request.getOffset(),
                request.getLimit()).collect().asList();

        return Uni.combine().all()
                .unis(total, data)
                .asTuple()
                .onItem().transform(tuple -> {
                    return SearchResponse.<HaccpModel>builder()
                            .total(tuple.getItem1())
                            .data(tuple.getItem2())
                            .build();
                });
    }

    @POST
    @Path("validate")
    public Uni<Response> validateLot(JsonArray jsonArray) {
        return pg.validateLot(jsonArray)  
                .onItem().transform(x -> Response.ok(x))
                .onItem().transform(ResponseBuilder::build);
    }
}
