const weather = document.querySelector(".js-weather");

const API_KEY = "e13af1faa92f99f8e2bee06edce451ee";
const COORDS = "coords";

function getWeather(lat, log) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperaute = json.main.temp;
      const place = json.name;
      const country = json.sys.country;
      weather.innerText = `temp : ${temperaute} ${place} ${country}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
