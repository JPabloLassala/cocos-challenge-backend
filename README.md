# Cocos Challenge Backend
## Description

Este proyecto es una resolucion del Backend Challenge de CocosCapital.

En este proyecto, implementé las tecnologías que suelo manejar más seguido.

## Aspectos técnicos
El proyecto implementa NestJS con el agregado de muchos componentes y clases para asegurar la resistencia a fallos, monitoreo, serialización y validación. El código apunta a ser de fácil comprensión para cualquier desarrollador adicional que quiera involucrarse en el proyecto.

En cuanto a tecnologías utilizadas están `NodeJS`, `NestJS`, `Jest`, `TypeORM`, `PostgreSQL`, `Eslint` y `Prettier`.

## Aspectos funcionales
Se creó un directorio diferente por cada *unidad de dominio*, que engloba tanto entidades de datos, como `User` o `Instrument`, tanto como entidades de negocio, que si bien no tienen representación directa en la base de datos, representan un elemento de la aplicación, como `Portfolio`.

Cada directorio separa en 3 el ciclo de vida de cada petición:
- `Application` para lo relacionado a la request HTTP, serialización y validación de parámetros
- `Domain` para la definición de la entidad de dominio, y lógica abstracta de negocio
- `Infrastructure` para la implementación técnica. En este caso, para la persistencia en la base de datos

## Dinámica de proyecto

El proyecto utiliza *Git flow*. Esto significa, las ramas son separadas en 3 tipos:
- `main` donde están los cambios que se consideran aptos para **producción**
- `develop` donde están los últimos cambios en desarrollo
- `CCC-##-<descripcion>` estas son diferentes ramas, donde cada una describe un cambio singular en el código y la funcionalidad. Por ejemplo, `CCC-11-migrations` es la rama donde se implementaron las migraciones

## Requerimientos
- **Portfolio:** La respuesta deberá devolver el valor total de la cuenta de un usuario, sus pesos disponibles para operar y el listado de activos que posee (incluyendo cantidad de acciones, el valor total monetario de la posición ($) y el rendimiento total (%)).

Endpoint: [GET]  `http://localhost:3000/portfolio/:userId`

- **Buscar activos:** La respuesta deberá devolver el listado de activos similares a la busqueda realizada (tiene que soportar busqueda por ticker y/o por nombre).

Endpoint (ticker): [GET] `http://localhost:3000/asset?ticker=:ticker`

Endpoint (nombre): [GET]  `http://localhost:3000/asset?name=:name`

> **_NOTA:_**  Se pueden combinar los parámetros. Por ej, `http://localhost:3000/asset?ticker=:ticker&name=:name`

- **Enviar una orden al mercado:** A traves de este endpoint se podrá enviar una orden de compra o venta del activo. Soportando dos tipos de ordenes: MARKET y LIMIT. Las ordenes MARKET no requieren que se envíe el precio ya que se ejecutara la orden con las ofertas del mercado, por el contrario, las ordenes limite requieren el envío del precio al cual el usuario quiere ejecutar la orden. La orden quedará grabada en la tabla orders con el estado y valores correspondientes.

Endpoint: [POST] `http://localhost:3000/order`

> **_NOTA:_**  En el archivo de Postman hay un ejemplo para el request body


## Instalación

- Instalar las dependencias del proyecto:
```bash
$ yarn
```

- Generar el .env
```bash
$ cp .env.example .env
```

- Levantar los container
```bash
$ docker-compose up -d
```

- Correr las migraciones
```bash
$ yarn migrations:run
```

## Test

Se crearon test de integration para la funcionalidad de enviar orden.

Para esto, se mockearon los elementos de las tablas `users`, `instruments`, `marketdata` y `order` y se corrió la lógica de negocio directo desde el servicio, estando tanto este como el Adapter sin modificar. 

```bash
# test unitarios 
$ yarn run test

# coverage
$ yarn run test:cov
```
