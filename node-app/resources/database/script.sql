create user haccp with encrypted password 'maJ5Se9BUJaH2s3Hd';

create database haccp with owner haccp;


-- REQUEST_ENVIRONMENT TABLE
CREATE TABLE public.request_environment (
    environment_id serial PRIMARY KEY, 
    environment_name varchar NOT NULL
);

-- REQUEST_TYPE TABLE
CREATE TABLE public.request_type (
    type_id serial PRIMARY KEY, 
    type_name varchar,
    url varchar NOT NULL
);

-- REQUEST_BODY TABLE
CREATE TABLE public.request_body (
    id serial PRIMARY KEY, 
    environment_id int4,
    type_id int4,
    source varchar NOT NULL,
    destination varchar NOT NULL,
    operation varchar NOT NULL,
    verb varchar NOT NULL,
    path varchar NOT NULL,
    state bool,
    CONSTRAINT FK_environment FOREIGN KEY (environment_id) REFERENCES public.request_environment(environment_id),
    CONSTRAINT FK_request_type FOREIGN KEY (type_id) REFERENCES public.request_type(type_id)
);

-- Insert statements
INSERT INTO "public"."request_environment" ("environment_name") VALUES
('PRUEBA');

-- Insert into request_type and capture the generated type_id
INSERT INTO "public"."request_type" ("type_name", "url") VALUES
('BUSSINES-ONE-BODEGA', 'https://integrador.eurofish.com.ec:8490/v1/api/message/business-one'),
('BUSSINES-ONE-UBICACIONES', 'https://integrador.eurofish.com.ec:8490/v1/api/message/business-one');

-- Insert into request_body, assuming environment_id = 1 and type_id values are 1 and 2 respectively
INSERT INTO "public"."request_body" ("source", "destination", "operation", "verb", "path", "state", "environment_id", "type_id") VALUES
('1', '578c19ea-5930-417d-8fcc-661536f0775c', 'R', 'GET', '/BinLocations?$select=Warehouse', true, 1, 1),
('1', '578c19ea-5930-417d-8fcc-661536f0775c', 'R', 'GET', '/BinLocations', true, 1, 2);

-- FUNCTION TO SEARCH REQUEST BY TYPE
CREATE OR REPLACE FUNCTION public.search_request_by_type(p_request_type varchar)
RETURNS json
LANGUAGE plpgsql
AS $$
DECLARE
    result json;
BEGIN
    SELECT json_build_object(
        'id', rb.id,
        'type', rt.type_name,
        'url', rt.url,
        'source', rb.source,
        'destination', rb.destination,
        'operation', rb.operation,
        'verb', rb.verb,
        'path', rb.path,
        'state', rb.state
    ) INTO result
    FROM public.request_body rb
    JOIN public.request_type rt ON rb.type_id = rt.type_id
    WHERE rb.state = TRUE
      AND rt.type_name = p_request_type
    LIMIT 1;
    RETURN result;
END;
$$;

-- TEST FUNCTION CALL
SELECT public.search_request_by_type('BUSSINES-ONE-UBICACIONES');
