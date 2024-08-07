

## Instructivo del Levantamiento del Software

Para levantar el software, debe realizar los siguientes pasos:

1. Clone el repositorio desde la URL proporcionada.
2. Navegue hasta el directorio del proyecto backend.
3. Instale las dependencias utilizando el comando `npm install`.
4. Configure las variables de entorno necesarias en la carpeta `env` 

### Pruebas locales
`npm run dev`

### Pruebas desarrollo producción
`tsc`
`npm run start:prod`

### Con contenedor
`docker-compose up --build`

## Crear petición
```
curl --location 'http://localhost:6505/api/v1/peticion' \
--header 'Content-Type: application/json' \
--data '{
   "body":{ 
        "tipo": "BUSSINES-ONE-BODEGA",
        "url": "https://integrador.eurofish.com.ec:8490/v1/api/message/business-one",
        "source": "1",
        "destination": "578c19ea-5930-417d-8fcc-661536f0775c",
        "operation": "R",
        "verb": "GET",
        "path": "/BinLocations?$select=Warehouse",
        "ambiente": "PRUEBA"
    }
}'

curl --location 'http://localhost:6505/api/v1/peticion' \
--header 'Content-Type: application/json' \
--data '{
   "body":
   { 
        "tipo": "BUSSINES-ONE-UBICACIONES",
        "url": "https://integrador.eurofish.com.ec:8490/v1/api/message/business-one",
        "source": "1",
        "destination": "578c19ea-5930-417d-8fcc-661536f0775c",
        "operation": "R",
        "verb": "GET",
        "path": "/BinLocations",
        "ambiente": "PRUEBA"
    }
}'
```


## Obtener bodegas
```
curl --location --request POST 'http://localhost:6505/api/v1/bussines-one-bodega' \
--data ''
```
## Obtener bodegas
```
curl --location 'http://localhost:6505/api/v1/bussines-one-ubicaciones' \
--header 'Content-Type: application/json' \
--data '{
    "bodega":"BMP"
}'
```