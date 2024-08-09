

## Instructivo del Levantamiento del Software

Para levantar el software, debe realizar los siguientes pasos:

1. Clone el repositorio desde la URL proporcionada.
2. Navegue hasta el directorio del proyecto backend.
3. Instale las dependencias utilizando el comando `npm install`.
4. Crear un archivo .env con las siguientes variables en la ruta raiz de node app
```
# Variables de entorno para la aplicación
PORT=6505
URL=0.0.0.0

#Variables de entorno para la base de datos
HOST=192.168.248.245
PORT_DB=5432
USER=haccp
PASSWORD_BD=maJ5Se9BUJaH2s3Hd
DATABASE=haccp

#Variables de entorno para el servidor de logs
LOGS_HOST=localhost
LOGS_PORT=5000

#Variables de entorno para el middleware 
MW_URL=https://integrador.eurofish.com.ec:8490/v1/api/message/generic
MW_SOURCE=e33634e1-4bbc-4b0c-aed9-d4d70431c88b
MW_DESTINATION=9a5f6001-4b83-42e0-b78e-6bd4f127dff3
MW_OPERATION=R
MW_VERB=POST
MW_PATH=/2c99d65c-8ef9-4aa2-814c-352a0c23b201

```

### Pruebas locales
`npm run dev`

### Pruebas desarrollo producción
`tsc`
`npm run start:prod`

### Con contenedor
```
npm run build
docker-compose up --build haccp-app
docker-compose up haccp-app
```
Instalar globalmente typescrit `npm install -g typescript`

## Obtener información lote
```
curl --location 'http://localhost:6505/v1/api/haccp/vessel-lot-info' \
--header 'Content-Type: application/json' \
--data '{
    "lot": "935-5-2024"
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