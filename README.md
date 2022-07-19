## Que contiene este repo ?

Tiene un grupo de test que no pasan a menos que este dos contenedores de wiremock y de postgress iniciados y con los volumenes correctamente montados.

## Que necesito para usar este repo

node 16 y docker

## Algunos comandos utiles :D

### Para instalar las dependencias del proyecto
``` 
npm run install
```
### Comandos Punto Uno

#### Para correr los test relacionados al punto uno
``` 
npm run test:pto1
```

#### Para eliminar los contenedores:
``` 
docker stop wiremock-local
docker rm wiremock-local
```
#### Para iniciar el contenedor de wiere mock:
```
docker run -it -d --name wiremock-local -p <puerto en local>:8080 wiremock/wiremock:2.33.1
```

#### Comandos Punto Dos

#### Para eliminar los contenedores:
``` 
docker stop wiremock-local
docker rm wiremock-local
docker stop postgres-local
docker rm postgres-local
``` 
#### Para iniciar los contenedores:
``` 
docker run -it -d --name wiremock-local -p <puerto en local>:8080 -v <carpeta en local>:/home/wiremock wiremock/wiremock:2.33.1
docker run -it -d --name postgres-local -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:alpine
```

#### Para usar la terminal dentro del contenedor de postgress
```
docker exec -it postgres-local psql -U postgres -c " CREATE TABLE public.transacciones_sube (numero_de_tarjeta varchar NULL, id_de_transaccion varchar NULL ); "
```