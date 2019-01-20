# CLIMA QL

Convierte la RESTful API del SMN (Servicio Meteorológico Nacional Argentino) en datos GraphQL.

## Pagina Principal

<https://climaql-server.glitch.me/>

Al entrar muestra el clima segun la estación meteorologica mas cercano a tu ubicación.

En la parte superior se puede ingresar al Playground para probar los Query.

## Query Disponibles

* `getWeahterById(id!)` / Dado un ID de una subestación, devuelve los datos de la misma y del clima del lugar
* `getWeahterByCoords(lat!,lon!)` / Dado unas Coordenadas devuelve los datos de la misma y del clima del lugar dela Subestación mas cercana
* `getWeathers` / Devuelve un objecto con los datos de la substación y los datos del clima del lugar, todos los disponibles
* `getForecasts` / Devuelve todos los pronosticos disponibles de todas las subestaciones
* `getForecast(id!)` Dado un ID de una subestación, devuelve los pronosticos disponibles

## Versión

Actual de Server: `0.4.1`.

Actual de Client: `0.4.0`.

### Server
Anteriores: 
* `0.1.0` - Solo informaba el ID segun lat y lon; y el estado del clima de todas las subestaciones.
* `0.1.1` - Correción con problemas para mostrar pronostico, estos ya no son parte.
* `0.2.0` - Agregar Query para mostrar Pronosticos de 1 subestación
* `0.2.1` - Corregir carga de datos de Pronosticos
* `0.3.0` - Agregar Queries de Pronostico de todas las subestaciones y clima Actual de solo 1.
* `0.4.0` - Elimina getLocationId (no mostraba bien los ID). Reemplazo de getWeather por getWeatherByID y getWeatherbyCoords.
* `0.4.1` - Mejora en la busqueda por Coordenadas

### Client

Anteriores:
* `0.1.0` - Solo Playground para GraphQL
* `0.2.0` - Muestra Clima segun Geo-Posición con Click de un Boton
* `0.3.0` - Muestra Clima segun Geo-Posición al Ingresar. 
* `0.3.1` - Agregar cambiar Imagen del Clima segun el tipo.
* `0.4.0` - Agregar Barra Navegadora y Footer con Links

## Hecho con

* Node.js
* Express.js
* GraphQL
* Apollo
* [Glitch](https://glitch.com/)
* SMN API

## Hecho por Gastón Pereyra