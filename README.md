# CLIMA QL

<img src="https://cdn.glitch.com/14524ae1-2b69-4f47-8612-cf3ccbf9b37f%2FClimaQL_00.png?1548113833610" width="900">

Convierte la RESTful API del SMN (Servicio Meteorológico Nacional Argentino) en datos GraphQL.

## Pagina Principal

<img src="https://cdn.glitch.com/14524ae1-2b69-4f47-8612-cf3ccbf9b37f%2FclimaQL_05.png?1548113896706" width="900">

En Glitch: <https://climaql-server.glitch.me/>

En Github (Recomendada para usuarios en Chrome) : <https://gastonpereyra.github.io/climaQL-server/>

Al entrar muestra el clima segun la estación meteorologica mas cercano a tu ubicación.

<img src="https://cdn.glitch.com/14524ae1-2b69-4f47-8612-cf3ccbf9b37f%2FClimaQL_01.png?1548036106210" width="900">

En la parte superior se puede ingresar al Playground para probar los Query.

## Query Disponibles

* `getWeahterById(id!)` / Dado un ID de una subestación, devuelve los datos de la misma y del clima del lugar
* `getWeahterByCoords(lat!,lon!)` / Dado unas Coordenadas devuelve los datos de la misma y del clima del lugar dela Subestación mas cercana
* `getWeathers` / Devuelve un objecto con los datos de la substación y los datos del clima del lugar, todos los disponibles
* `getForecasts` / Devuelve todos los pronosticos disponibles de todas las subestaciones
* `getForecast(id!)` Dado un ID de una subestación, devuelve los pronosticos disponibles

## Versión

Actual de Server: `0.4.2`.

Actual de Client: `0.5.0`.

### Server
Anteriores: 
* `0.1.0` - Solo informaba el ID segun lat y lon; y el estado del clima de todas las subestaciones.
* `0.1.1` - Correción con problemas para mostrar pronostico, estos ya no son parte.
* `0.2.0` - Agregar Query para mostrar Pronosticos de 1 subestación
* `0.2.1` - Corregir carga de datos de Pronosticos
* `0.3.0` - Agregar Queries de Pronostico de todas las subestaciones y clima Actual de solo 1.
* `0.4.0` - Elimina `getLocationId` (no mostraba bien los ID). Reemplazo de getWeather por `getWeatherByID` y `getWeatherbyCoords`.
* `0.4.1` - Mejora en la busqueda por Coordenadas
* `0.4.2` - `getWeathers` y `getWeathersBy` ahora también pueden mostrar pronosticos (solución al problema de `0.1.1`)

### Client

Anteriores:
* `0.1.0` - Solo Playground para GraphQL
* `0.2.0` - Muestra Clima segun Geo-Posición con Click de un Boton
* `0.3.0` - Muestra Clima segun Geo-Posición al Ingresar. 
* `0.3.1` - Agregar cambiar Imagen del Clima segun el tipo.
* `0.4.0` - Agregar Barra Navegadora y Footer con Links
* `0.5.0` - Agregar función de cambio de colores por dia/noche y segun temperatura

## Hecho con

* Node.js
* Express.js
* GraphQL
* Apollo
* [Glitch](https://glitch.com/)
* SMN API

## Hecho por Gastón Pereyra
* Github: <https://github.com/gastonpereyra/climaQL-server>
* Docs de la API del SMN: <https://github.com/gastonpereyra/smnQL>
