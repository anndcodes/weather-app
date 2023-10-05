function formatDate(currentDate) {
  let hour = currentDate.getHours();
  hour < 10 ? hour = `0${hour}` : false;
  let minutes = currentDate.getMinutes();
  minutes < 10 ? minutes = `0${minutes}` : false;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[currentDate.getDay()];
  let fullDate = `${day}, ${hour}:${minutes}`;
  let fullCurrentDate = document.querySelector(".current-date").innerHTML = fullDate;
}

formatDate(new Date());