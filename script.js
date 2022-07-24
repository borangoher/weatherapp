const formElem = document.getElementById("form");
const searchBar = document.getElementById("search");
const APIKey = "ebf42d0da36817869be7e9835c12a83a";

const weatherHead = document.getElementById("header");
const weatherType = document.getElementById("weather");
const tempVal = document.getElementById("temp");
const tempApp = document.getElementById("ap-temp");
const tempMax = document.getElementById("max-temp");
const tempMin = document.getElementById("min-temp");
const humVal = document.getElementById("hum");
const presVal = document.getElementById("pres");

const createURL = function (inputElem, key) {
    const query = inputElem.value;
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + key;
    return URL;
}

const fetchData = async function (URL) {
    const fetchRes = await fetch(URL, {mode: 'cors'});
    const fetchJSON = await fetchRes.json();
    return fetchJSON;
}

const toCelcStr = function (num) {
    let celcVal = num - 273.15;
    return celcVal.toFixed(2);
}

const displayData = async function (weatherJSON) {
    const weatherObject = await weatherJSON.then(function(response) {return response});
    weatherHead.textContent = "Currently viewing data for: " + weatherObject.name;
    weatherType.innerHTML = weatherObject.weather[0].main + `
                            <small class="text-muted" id="desc">` + weatherObject.weather[0].description + `</small>`;
    tempVal.textContent = "Temperature: " + toCelcStr(weatherObject.main.temp) + "°C";
    tempApp.textContent = "Apparent Temperature: " + toCelcStr(weatherObject.main.feels_like) + "°C";
    tempMax.textContent = "Maximum Temperature: " + toCelcStr(weatherObject.main.temp_max) + "°C";
    tempMin.textContent = "Minimum Temperature: " + toCelcStr(weatherObject.main.temp_min) + "°C";
    humVal.textContent = "Humidity: " + toCelcStr(weatherObject.main.humidity) + "%";
    presVal.textContent = "Pressure: " + toCelcStr(weatherObject.main.pressure) + "mb";
}

formElem.addEventListener("submit", function (event) {event.preventDefault(); displayData(fetchData(createURL(searchBar, APIKey)));});
