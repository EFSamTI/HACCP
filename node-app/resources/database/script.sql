create user haccp with encrypted password 'maJ5Se9BUJaH2s3Hd';

create database haccp with owner haccp;

-- REQUEST_ENVIRONMENT TABLE
CREATE TABLE public.request_environment (
    environment_id serial PRIMARY KEY, 
    environment_name varchar NOT NULL,
    createdAt timestamp NOT NULL DEFAULT now(),
    updatedAt timestamp
);

-- REQUEST_TYPE TABLE
CREATE TABLE public.request_type (
    type_id serial PRIMARY KEY, 
    type_name varchar,
    url varchar NOT NULL,
    createdAt timestamp NOT NULL DEFAULT now(),
    updatedAt timestamp
);

-- REQUEST_BODY TABLE
CREATE TABLE public.request_body (
    id serial PRIMARY KEY, 
    environmentId int4,
    requestTypeId int4,
    source varchar NOT NULL,
    destination varchar NOT NULL,
    operation varchar NOT NULL,
    verb varchar NOT NULL,
    path varchar NOT NULL,
    state bool,
    createdAt timestamp NOT NULL DEFAULT now(),
    updatedAt timestamp,
    CONSTRAINT FK_environment FOREIGN KEY (environmentId) REFERENCES public.request_environment(environment_id),
    CONSTRAINT FK_request_type FOREIGN KEY (requestTypeId) REFERENCES public.request_type(type_id)
);