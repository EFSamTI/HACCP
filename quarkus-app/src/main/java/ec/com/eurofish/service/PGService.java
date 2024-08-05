package ec.com.eurofish.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import io.quarkus.reactive.datasource.ReactiveDataSource;
import io.vertx.mutiny.pgclient.PgPool;
// import io.vertx.mutiny.sqlclient.Tuple;

@ApplicationScoped
public class PGService {
    @Inject
    @ReactiveDataSource("HACCP")
    PgPool pg;
}
