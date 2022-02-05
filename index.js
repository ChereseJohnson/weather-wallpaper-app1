let now = new Date();
let h3 = document.querySelector("h3");
console.log(h3);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${day} ${hours}:${minutes} `;

function getCurrentTemp(response) {
  let h1 = document.querySelector("h1");
  let degrees = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;

  h1.innerHTML = `${city}`;
  degrees.innerHTML = `${temp}°F`;
}

function getCurrentCityTemp(event) {
  event.preventDefault();

  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "d702c598912f6b831e35edf8569da794";
    let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

    axios.get(currentUrl).then(getCurrentTemp);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", getCurrentCityTemp);

function getSearchCityTemp(response) {
  let h1 = document.querySelector("h1");
  let degrees = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;

  h1.innerHTML = `${city}`;
  degrees.innerHTML = `${temp}`;
}

function searchCityTemp(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-text-input").value;

  let apiKey = "4141fa5fc237e61dbdda6ca492b87baf";
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
  axios.get(searchUrl).then(getSearchCityTemp);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", searchCityTemp);
