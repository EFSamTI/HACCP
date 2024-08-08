

## Instructivo del Levantamiento del Software

Para levantar el software, debe realizar los siguientes pasos:

1. Clone el repositorio desde la URL proporcionada.
2. Navegue hasta el directorio del proyecto backend.
3. Instale las dependencias utilizando el comando `npm install`.
4. Crear un archivo .env con las siguientes variables en la ruta raiz de node app
```
# Variables de entorno para la aplicación
PORT=6505
URL=localhost

#Variables de entorno para la base de datos
HOST=192.168.248.245
PORT_DB=5432
USER=haccp
PASSWORD_BD=maJ5Se9BUJaH2s3Hd
DATABASE=haccp

#Variables de entorno para el servidor de logs
LOGS_HOST=localhost
LOGS_PORT=5000

```

### Pruebas locales
`npm run dev`

### Pruebas desarrollo producción
`tsc`
`npm run start:prod`

### Con contenedor
```
tsc
docker-compose build
docker-compose up -d
```
Instalar globalmente typescrit `npm install -g typescript`

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