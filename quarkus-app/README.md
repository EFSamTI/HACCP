# Para pruebas locales

## Unix/Linux
Crear un archivo .env con las siguientes variables:
```
HACCP_PG_URL=postgresql://192.168.248.245:5432/haccp
HACCP_PG_USERNAME=haccp
HACCP_PG_PASSWORD=maJ5Se9BUJaH2s3Hd
```

En una terminal ejecutar ```./gradlew :quarkus-app:quarkusDev -Denv-file=.env```


## Windows 
Ingresa las variables de entorno por consola:

```
$env:HACCP_PG_URL="postgresql://192.168.248.245:5432/haccp"
$env:HACCP_PG_USERNAME="haccp"
$env:HACCP_PG_PASSWORD="maJ5Se9BUJaH2s3Hd"
.\gradlew :quarkus-app:quarkusDev
```

## Buscar por estado
```
curl --location 'http://0.0.0.0:8101/v1/api/haccp/search' \
--header 'Content-Type: application/json' \
--data '{
    "state": 1,
    "offset": 0,
    "limit": 10
}'
```

## Agregar un lote HACCP
```
curl --location 'http://0.0.0.0:8101/v1/api/haccp' \
--header 'Content-Type: application/json' \
--data '{
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
}'
```

## Actualizar estado
```
curl --location 'http://0.0.0.0:8101/v1/api/haccp/update-state' \
--header 'Content-Type: application/json' \
--data '{
    "lot": "890-1-22-1",
    "state": 10
}'
```