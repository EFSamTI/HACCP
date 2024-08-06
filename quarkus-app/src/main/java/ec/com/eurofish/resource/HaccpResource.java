package ec.com.eurofish.resource;

import ec.com.eurofish.model.HaccpModel;
import ec.com.eurofish.model.SearchRequest;
import ec.com.eurofish.model.UpdateRequest;
import ec.com.eurofish.service.PGService;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
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

    @PUT
    public Uni<Response> updateState(UpdateRequest request) {
        return pg.updateState(request.getLot(), request.getState())
                .onItem().transform(x -> Response.ok(x))
                .onItem().transform(ResponseBuilder::build);
    }

    @POST
    @Path("search")
    public Multi<HaccpModel> searchByState(SearchRequest request) {
        return pg.searchByState(request.getState(), request.getOffset(), request.getLimit());
    }
}
