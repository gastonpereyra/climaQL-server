import fetch from 'node-fetch';
const URL_SMNAPI = 'https://ws.smn.gob.ar/'; // Dirección de Base de la REST-API

// HELPERS
/**
*  Busca la Estacion mas Cercana a las coordenadas dadas
*  @param {number} lat  Latitud a Buscar
*  @param {number} lon  Longitud a Buscar
*  @param {Array} stations  Colección donde Buscar
*  @return {Object}  Objeto encontrado, default: el primero de la Colección
*/
const getClosestStation = (lat, lon, stations) => {
  
  let closest = null; // index de la estación mas cercana
  let closest_lat = null; // referencia, latitud temporalmente mas cercana
  let closest_lon = null; // referencia, longitud temporalmente mas cercana

  // Buscamos dentro de la Colección
  const selectStation = stations.find( (station, i) => {          
    if (closest === null) { // Si es el primer valor inicializamos
      closest = i;
      closest_lat = Math.abs(parseFloat(lat)-parseFloat(station.lat));
      closest_lon = Math.abs(parseFloat(lon)-parseFloat(station.lon));
    }
    else {
        // Valores Relativos de la posicion actual y la estación
        const rel_lat = Math.abs(parseFloat(lat)-parseFloat(station.lat));
        const rel_lon = Math.abs(parseFloat(lon)-parseFloat(station.lon));
        // Comparamos los valores, mas cerca de 0 simultaneamente mas cerca
        if ( (rel_lat < closest_lat) && (rel_lon < closest_lon) ) { 
          // Cambiamos los valores de referencia
          closest_lat = rel_lat;
          closest_lon = rel_lat;
          closest = i;
      } 
    }
    return (closest_lat === 0 && closest_lon === 0) // equivalente a (station.lat === lat && station.lon === lon)
  })
  // Si encontró la estación la devolvemos sino la mas cercana
  return selectStation ? selectStation : stations[closest];
};

// RESOLVERS
export const resolvers = {
  Query: {
    getWeatherByCoords: (root, {lat, lon}) => {
      return fetch(URL_SMNAPI+"map_items/weather")
        .then( res => res.json())          
        .then ( stations => getClosestStation(lat,lon,stations))
        .catch(error => {
          console.log("Error Weather : "+error);
          return null;
        });
    },
    getWeatherById: (root, {id}) => {
      return fetch(URL_SMNAPI+"map_items/weather")
        .then( res => res.json())          
        .then ( stations =>  stations.find( station => station.lid === parseInt(id) ))
        .catch(error => {
          console.log("Error Weather : "+error);
          return null;
        });
    },
    getWeathers: () => {
      return fetch(URL_SMNAPI+"map_items/weather")
        .then( res => res.json())
        .catch(error => {
          console.log("Error Weather : "+error);
          return [];
        });
    },
    getForecast: (root, {id}) => {
      return fetch(URL_SMNAPI+"forecast")
        .then( res => res.json())
        .then ( stations => stations.find( station => station.location_id === parseInt(id) ) )
        .then ( (forecast) => {
          const forecastKeys= Object.keys(forecast.forecast);
          return ({
            "_id": forecast._id,
            "timestamp": forecast.timestamp,
            "date_time": forecast.date_time,
            "location_id": forecast.location_id,
            "forecast": forecastKeys.map( key => forecast.forecast[key])
          });
        })
        .catch(error => {
          console.log("Error Weather : "+error);
          return [];
        });
    },
    getForecasts: () => {
      return fetch(URL_SMNAPI+"forecast")
        .then( res => res.json())
        .then ( (forecasts) => forecasts.map( forecast => {
            const forecastKeys= Object.keys(forecast.forecast);
            return ({
              "_id": forecast._id,
              "timestamp": forecast.timestamp,
              "date_time": forecast.date_time,
              "location_id": forecast.location_id,
              "forecast": forecastKeys.map( key => forecast.forecast[key])
            });
        }))
        .catch(error => {
          console.log("Error Weather : "+error);
          return [];
        });
    }
  }
}