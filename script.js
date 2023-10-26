// get real-time and date
function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let hour = currentDate.getHours();
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

  let weatherApp = document.querySelector(".weather-app");
  let forecast = document.querySelector("#forecast");

  if (hour >= 6 && hour < 18) {
    weatherApp.style.backgroundImage =
      "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)";
    weatherApp.style.color = "#9696d6";
    forecast.style.color = "#59599b";
  } else if (hour >= 18) {
    weatherApp.style.backgroundImage =
      "linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%)";
    weatherApp.style.color = "#ccee";
    forecast.style.color = "#fff";
  } else {
    weatherApp.style.backgroundImage = "#fffdfc";
    weatherApp.style.color = "#9696d6";
    forecast.style.color = "#59599b";
  }

  hour < 10 ? (hour = `0${hour}`) : false;

  return `${day} ${hour}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
                  <div class="col">
                    <div class="weather-forecast-date">
                      ${formatForecastDay(forecastDay.dt)}
                    </div>
                    <img class="forecast-icon" src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt="">
                    <div class="weather-forecast-temp">
                      <span class="weather-forecast-temp-max">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                      <span class="weather-forecast-temp-min">${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                    </div>
                  </div>
                </div>`;
      forecastElement.innerHTML = forecastHTML.slice(9);
    }
  });
}

// create img element to use with temperature icon
let weatherIcon = document.createElement("img");
weatherIcon.classList.add("weather-icon");

function getForecast(coordinates) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiURl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURl).then(displayForecast);
}

// get temperature by searching for a city
function showTemp(response) {
  celsiusTemp = response.data.main.temp;
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
  let date = (document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  ));

  // append img element and set icon image
  let weatherImg = document.querySelector(".weather-img").append(weatherIcon);

  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "b782a5a0cba928a80029c0fd1ea418bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  search(city);
}

// convert temperature from celsius to fahrenheit
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperature = (document.querySelector("#temperature").innerHTML =
    fahrenheitTemp);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = (document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemp));
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
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
  .addEventListener("submit", handleSubmit);

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);

search("Sao Paulo");
