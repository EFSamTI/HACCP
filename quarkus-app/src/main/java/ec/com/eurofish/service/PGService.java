package ec.com.eurofish.service;

import ec.com.eurofish.model.HaccpModel;
import io.quarkus.reactive.datasource.ReactiveDataSource;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.pgclient.PgPool;
import io.vertx.mutiny.sqlclient.Tuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class PGService {
    @Inject
    @ReactiveDataSource("HACCP")
    PgPool pg;

    public Uni<Long> totalByState(Integer state) {
        return pg.preparedQuery("select * from total_by_state($1)")
                .execute(Tuple.of(state))
                .onItem().transform(set -> set.iterator().next().getLong(1));
    }

    public Multi<HaccpModel> searchByState(Integer state, Integer offset, Integer limit) {
        return pg.preparedQuery("select * from search_by_state($1, $2, $3)")
                .execute(Tuple.of(state, offset, limit))
                .onItem().transformToMulti(set -> Multi.createFrom().iterable(set))
                .onItem().transform(HaccpModel::from);
    }

    public Uni<Void> addLot(JsonObject json) {
        return pg.preparedQuery("select from add_lot($1)")
                .execute(Tuple.of(json))
                .replaceWithVoid();
    }

    public Uni<JsonObject> updateState(String lot, Integer state) {
        return pg.preparedQuery("select * from update_state($1, $2)")
                .execute(Tuple.of(lot, state))
                .onItem().transform(set -> set.iterator().next().getJsonObject(1));
    }
}
