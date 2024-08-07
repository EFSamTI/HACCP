create user haccp with encrypted password 'maJ5Se9BUJaH2s3Hd';

create database haccp with owner haccp;

-- HACCP_LOT TABLE
create table haccp_lot (
	lot character varying not null primary key,
	state int not null default 0,
	body json
)

alter table haccp_lot owner to haccp;

-- ADD LOT FX
drop function if exists add_lot(text);

create or replace function add_lot(text)
returns void as
$$
declare	v_lot_array character varying array;
		v_body json;
begin
	select haccp_lot, lot
	into v_lot_array, v_body
	from json_to_record($1::json) x (
		haccp_lot character varying array,
		lot json
	);
	-- raise notice '%', unnest(v_lot_array);
	-- raise notice '%', v_body;
	if exists (select 1 from haccp_lot where lot = v_lot_array[1]) then
		update 	haccp_lot 
		set		body = v_body
		where	lot = v_lot_array[1];
	else
		insert into haccp_lot (lot, body)
		values (v_lot_array[1], v_body);
	end if;
end;
$$ language plpgsql;

alter function add_lot(text) owner to haccp;

-- TEST
/*
select from add_lot('{
  "haccp_lot":[
    "890-1-22-1"
  ],
  "lot":{
    "pk":"67922022-cd05-4057-9295-c78afbe03d99",
    "code":"890-1-2022",
    "name":"890-1-2022",
    "trip":"1",
    "year":"2022",
    "vessel":{
      "pk":"1bffba7d-64a6-40aa-b166-a8b15a528a39",
      "name":"CORDOVA- \"OBI PWS FLEET\"",
      "vesselCode":"890"
    },
    "supplier":{
      "pk":"925b4319-b117-4619-81f1-e367d3091115",
      "name":"OBI PWS FLEET"
    },
    "vessel_lot":"890-1-2022",
    "source_type":{
      "pk":"9f762176-3802-4a86-8d7b-303b1935de0a",
      "name":"Contenedores"
    },
    "eurofishcode":"890",
    "certification":"No",
    "purchaseOrder":"S/F-1-2022",
    "transshipment":"No",
    "landing_location":{
      "pk":"bcb5115d-3e84-498a-afc6-ce2cdac67332",
      "name":"Manta, Ecuador",
      "unloadingPort":"EC  MEC",
      "unloadingPortlocode":"EC MEC",
      "unloadingPortcoordinates":"0057S 08044W "
    },
    "unloadingStartDate":"2022-12-27",
    "reference_reception":"CGMU 5523706"
  }
}'::text)
*/

-- UPDATE_STATE FX
drop function if exists update_state (character varying, int);

create or replace function update_state (character varying, int)
returns json as
$$
declare	o_body json;
begin
	if exists(select 1 from haccp_lot where lot = $1) then
		update haccp_lot set state = $2;
		select body into o_body from haccp_lot where lot = $1;
	end if;
	return o_body;
end;
$$ language plpgsql;

alter function update_state (character varying, int) owner to haccp;

-- TEST
-- select * from update_state('890-1-22-1', 1)

-- SEARCH_BY_STATE
drop function if exists search_by_state(int, int, int);

create or replace function search_by_state(int, int, int) returns table (
	lot character varying,
	body json
) as
$$
declare	v_total bigint;
begin
	return query
		with x(i, ordered_lot, ordered_body) as (
			select row_number() over(order by l.lot), l.lot, l.body
			from haccp_lot l where l.state = $1
		) select ordered_lot, ordered_body from x offset $2 limit $3;
end;
$$ language plpgsql;

alter function search_by_state(int, int, int) owner to haccp;

-- TEST
-- select * from search_by_state(1, 0, 10)

-- TOTAL_BY_STATE
drop function if exists total_by_state(int);

create or replace function total_by_state(int)
returns bigint as
$$
	select count(*) from haccp_lot where state = $1;
$$ language sql;

alter function total_by_state(int) owner to haccp;

-- TEST
-- select * from total_by_state(1)


CREATE OR REPLACE FUNCTION public.validate_lot(input_json text)
RETURNS jsonb
LANGUAGE plpgsql
AS $function$
DECLARE
    v_lots jsonb;
    v_result jsonb;
BEGIN
    v_lots := input_json::jsonb;
    with lot_elements as (
        select jsonb_array_elements(v_lots) as v_lot
    ), 
    haccp_lots as (
        select (v_lot->'haccp_lot')->>0 as v_haccp_lot, v_lot->'lot' as v_lot_data
        from lot_elements
    ),
    no_exiting_lot as (
    	select v_haccp_lot, v_lot_data 
    	from haccp_lots
    	where not exists (select 1 from haccp_lot where lot = v_haccp_lot)
    )
    select jsonb_agg(jsonb_build_object(
    	'haccp_lot', jsonb_build_array(v_haccp_lot),
    	'lot', v_lot_data
    )) into v_result 
    from no_exiting_lot;
    return v_result;
END;
$function$;


-- TEST

/*
SELECT public.validate_lot(
    '[{"haccp_lot": ["890-1-22-2"], "lot": {"pk": "67922022-cd05-4057-9295-c78afbe03d99", "code": "890-1-2022", "name": "890-1-2022", "trip": "1", "year": "2022", "vessel": {"pk": "1bffba7d-64a6-40aa-b166-a8b15a528a39", "name": "CORDOVA- \"OBI PWS FLEET\"", "vesselCode": "890"}, "supplier": {"pk": "925b4319-b117-4619-81f1-e367d3091115", "name": "OBI PWS FLEET"}, "vessel_lot": "890-1-2022", "source_type": {"pk": "9f762176-3802-4a86-8d7b-303b1935de0a", "name": "Contenedores"}, "eurofishcode": "890", "certification": "No", "purchaseOrder": "S/F-1-2022", "transshipment": "No", "landing_location": {"pk": "bcb5115d-3e84-498a-afc6-ce2cdac67332", "name": "Manta, Ecuador", "unloadingPort": "EC  MEC", "unloadingPortlocode": "EC MEC", "unloadingPortcoordinates": "0057S 08044W "}, "unloadingStartDate": "2022-12-27", "reference_reception": "CGMU 5523706"}}]'
);
*/