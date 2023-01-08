const API_KEY = 'b0210b993a1a495c82383407230801';


const today_date = document.getElementById('navbar_date');
const form = document.getElementById('form');
const region_search = document.getElementById('region_search');
const search_input = document.getElementById('search_input');
const city_name = document.getElementById('city_name');
const weather_icon = document.getElementById('weather_icon');
const current_weather = document.getElementById('current_weather');
const current_temp = document.getElementById('current_temp');
const wind = document.getElementById('wind');
const precipitation = document.getElementById('precipitation');
const humidity = document.getElementById('humidity');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const moonrise = document.getElementById('moonrise');
const moonset = document.getElementById('moonset');



const getDate = () => {
  const date = new Date();
  let month = `${date.toLocaleString('en-US', { month: 'long', })} ${date.getFullYear()} `;
  let day = `${date.toLocaleString('en-US', { weekday: 'long' })}, ${date.toLocaleString('en-US', { month: 'short', day: '2-digit' })}`;
  today_date.innerHTML = `<h3>${month} | <span${day}</span></h3>`;
}

form.onsubmit = async (e) => {
  e.preventDefault();
  let search = search_input.value;
  await f(search);
}

const name = (location) => {
  city_name.innerText = location.name;
  let region = `, ${location.country}`;
  city_name.append(region);
}

const sun_moon_timings = (timings) => {
  sunrise.innerHTML = `Sunrise : ${timings.sunrise}`;
  sunset.innerText = `Sunset : ${timings.sunset}`;
  moonrise.innerText = `Moonrise : ${timings.moonrise}`;
  moonset.innerText = `Moonset : ${timings.moonset}`;
}

const current_weather_details = (current) => {
  weather_icon.src = current.condition.icon;
  current_weather.innerText = current.condition.text;
  current_temp.innerHTML = `${current.temp_c} <sup>o</sup>C`;
  wind.innerHTML = `Wind : ${current.wind_kph} (kph)`;
  precipitation.innerHTML = `Precipitation : ${current.precip_in} (mm) `;
  humidity.innerHTML = `Humidity : ${current.humidity}`;

}

const f = async (search) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${search}&aqi=no`)
    const data = await response.json();
    console.log(data);
    name(data.location);
    current_weather_details(data.current);
    sun_moon_timings(data.forecast.forecastday[0].astro);
  } catch (err) {
    console.log(err);
  }
}

f('bangalore');


