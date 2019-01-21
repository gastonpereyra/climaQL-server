const API = 'https://climaql-server.glitch.me/graphql'; // URL de la API
const IMAGE_URL = 'https://www.smn.gob.ar/sites/all/themes/smn/images/weather-icons/big-wi-';
// Imaganes de cada tipo de Clima
const image_day = [
  IMAGE_URL+"day-sunny.png",
  IMAGE_URL+"day-sunny-overcast.png",
  IMAGE_URL+"day-cloudy-high.png",
  IMAGE_URL+"rain.png",
  IMAGE_URL+"thunderstorm.png",
  IMAGE_URL+"snowflake-cold.png",
  IMAGE_URL+"day-sleet.png",
  IMAGE_URL+"snow.png",
  IMAGE_URL+".png",
  IMAGE_URL+"cloud-down.png",
  IMAGE_URL+"cloudy.png",
  IMAGE_URL+"day-sleet.png",
  IMAGE_URL+"day-cloudy.png",
  IMAGE_URL+"rain-mix.png",
  IMAGE_URL+"day-sleet-storm.png",
  IMAGE_URL+"day-cloudy-high.png",
  IMAGE_URL+"cloud-down.png",
  IMAGE_URL+"day-snow-thunderstorm.png",
  IMAGE_URL+"cloudy.png",
  IMAGE_URL+".png",
  IMAGE_URL+"strong-wind.png"
];
const image_night = [
  IMAGE_URL+"night-clear.png",
  IMAGE_URL+"night-alt-cloudy.png",
  IMAGE_URL+"night-cloudy-high.png",
  IMAGE_URL+"rain.png",
  IMAGE_URL+"thunderstorm.png",
  IMAGE_URL+"snowflake-cold.png",
  IMAGE_URL+"night-sleet.png",
  IMAGE_URL+"snow.png",
  IMAGE_URL+".png",
  IMAGE_URL+"cloud-down.png",
  IMAGE_URL+"cloudy.png",
  IMAGE_URL+"night-sleet.png",
  IMAGE_URL+"day-cloudy.png",
  IMAGE_URL+"rain-mix.png",
  IMAGE_URL+"night-sleet-storm.png",
  IMAGE_URL+"night-cloudy-high.png",
  IMAGE_URL+"cloud-down.png",
  IMAGE_URL+"night-snow-thunderstorm.png",
  IMAGE_URL+"cloudy.png",
  IMAGE_URL+".png",
  IMAGE_URL+"strong-wind.png"
];

// Buscar Elementos por ID
const main = document.getElementById("main");
const temp = document.getElementById("temp");
const st = document.getElementById("st");
const climaIcon = document.getElementById("climaIcon");
const desc = document.getElementById("desc");
const city = document.getElementById("city");
const province = document.getElementById("province");

/**
* Busca en la API los datos basicos del clima segun las coordenadas
* @params {Number} lat Latitud
* @params {Number} lon Longitud
*/
function getWeather(lat,lon) {
  // Si es de Dia o Noche
  const isDay = (new Date().getHours() > 7 && new Date().getHours() < 19);
  
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Le paso el Query en JSON
    body: JSON.stringify({ 
      query: `{ 
          estacion: getWeatherByCoords(lat: ${lat}, lon: ${lon}) {
            name
            province
            weather { 
              temp 
              st 
              description 
              id 
            } 
          } 
        }` 
      }),
    })
    .then(res => res.json()) // Recivo respuesta positiva, convierto a JSON
    .then(res => res.data.estacion) // Saco la data con el Alias
    .then(estacion => ({
      // Formateo la info par usarla
      "name": estacion.name,
      "province": estacion.province,
      "temp": estacion.weather.temp,
      "st": estacion.weather.st,
      "weather_id": estacion.weather.id,
      "description": estacion.weather.description
    }))
    .then( clima => {
      // Actualizó los datos con la info de la API
      city.innerHTML= clima.name;
      province.innerHTML= clima.province;
      temp.innerHTML= clima.temp+"°C";
      st.innerHTML= clima.st ? clima.st+"°C" : " - ";
      climaIcon.src= isDay ? image_day[clima.weather_id] : image_night[clima.weather_id];
      desc.innerHTML= clima.description;
      // Cambio colores segun hora y temp
      main.classList.add(isDay ? "is-light" : "is-dark");
      const tempColor = clima.temp > 30 ? "is-danger" : 
                  clima.temp > 25 ? "is-warning" : 
                  clima.temp > 15 ? "is-success" : 
                  "is-info"; 
      const stColor = !clima.st ? "is-white" :
                  clima.st > 30 ? "is-danger" : 
                  clima.st > 25 ? "is-warning" : 
                  clima.st > 15 ? "is-success" : 
                  "is-info"; 
      temp.classList.add(tempColor);
      st.classList.add(stColor);
      desc.classList.add("is-primary");
    })
    .catch(error => {
      desc.innerHTML= "ERROR - "+error;
    });
}

// Obtener la Geo Posición
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position)=> getWeather(position.coords.latitude,position.coords.longitude), // Si esta tiene permiso busca por Coordenadas
      () => getWeather(-34.62170792,-58.42575836) // Si no tiene permiso trae una por Default
    );
  } else { 
    desc.innerHTML= "ERROR - Su Navegador no soporta la Función requirada";
  }
}

// Para el NavBar - Sacado del sitio de Bulma
const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

if ($navbarBurgers.length > 0) {
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
      
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });
}

// Iniciar la busqueda de Posición Geografia
getLocation();

// Para acomodar la imagen en mobiles
if (window.innerWidth < 600) {
  document.getElementById('icon_container').classList.toggle('is-128x128');
  document.getElementById('icon_container').classList.toggle('is-64x64');
}
