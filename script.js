const api = {
  key: "0eff19a81aa8a7dbe98a51c58503425b",
  base: "https://api.openweathermap.org/data/2.5/",
};
let main = document.querySelector("main");
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather) {
  console.log(weather);
  const temperatura = weather.main.temp;

  console.log(temperatura);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(temperatura)}<span> °C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hilow");
  hilow.innerText = `${Math.round(weather.main.temp_min)} °C / ${Math.round(
    weather.main.temp_max
  )} °C`;
  // Promjena pozadine
  if (temperatura < 0) {
    document.querySelector("body").style.backgroundImage =
      "url(./images/bg.jpg)";
    document.querySelector("body").style.transition = "0.5s ease-in";
  } else if (temperatura > 0 && temperatura < 15) {
    document.querySelector("body").style.backgroundImage =
      "url(./images/summerbg.jpg)";
    document.querySelector("body").style.transition = "0.5s ease-in";
  } else if (temperatura >= 15) {
    document.querySelector("body").style.backgroundImage =
      "url(./images/eveningbg.jpg)";
    document.querySelector("body").style.transition = "0.5s ease-in";
  }
  // Kovertiranje mjernih jedinica (comming up)

  /*     if (mjernaJ.innerText === " °C") {
      temp.innerHTML = `${Math.round(temperatura * 2 + 30)}<span> F</span>`;
    }

    console.log(mjernaJ.innerHTML);
    if (mjernaJ.innerText === " °C") {
      temp.innerHTML = `${Math.round((temperatura - 30) / 2)}<span> °C</span>`;
    }
    */
}
function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tues", "Wed", "thurs", "Fri", "Sat"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
