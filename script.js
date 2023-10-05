// get real-time and date
function formatDate(currentDate) {
  let hour = currentDate.getHours();
  hour < 10 ? (hour = `0${hour}`) : false;
  let minutes = currentDate.getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : false;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  let fullDate = `${day}, ${hour}:${minutes}`;
  let fullCurrentDate = (document.querySelector(".current-date").innerHTML =
    fullDate);
}

formatDate(new Date());

// get temperature by searching for a city
function showTemp(response) {
  let city = (document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}`);
  let temperature = (document.querySelector(
    "#temperature"
  ).innerHTML = `${Math.round(response.data.main.temp)}`);
  let weatherDescription = (document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`);
  let humidity = (document.querySelector(
    ".humidity"
  ).innerHTML = `${response.data.main.humidity}%`);
  let wind = (document.querySelector(".wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`);
}

function search(city) {
  let apiKey = "b782a5a0cba928a80029c0fd1ea418bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  search(city);
}

// get user's current location temperature
function getLocation(position) {
  let apiKey = "b782a5a0cba928a80029c0fd1ea418bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocal = document
  .querySelector("#current-btn")
  .addEventListener("click", getPosition);

let form = document
  .querySelector(".search-form")
  .addEventListener("submit", searchCity);

search("Sao Paulo");
