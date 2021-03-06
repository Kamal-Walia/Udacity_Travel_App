import { countdown } from './utils';
import 'bootstrap';
const $ = require("jquery");

const getTripDate = (date) => {
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
    "December"
  ];
  
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const tripDate = new Date(date);
  const tripDateText = `${days[tripDate.getDay()]}, ${months[tripDate.getMonth()]} ${tripDate.getDate()}, ${tripDate.getFullYear()}`;

  return tripDateText;
}

const getWeatherInfo = (weatherForecast, date) => {
  const weather = {
    temperature: 0,
    summary: '',
    forecastTemp: 0,
    forecastSummary: ''
  };

  weather.temperature = weatherForecast.data[0].temp;
  weather.summary = weatherForecast.data[0].weather.description;
  date = Date.parse(date);

  for (let i = 0; i < weatherForecast.data.length; i++) {
    if (date >= new Date(weatherForecast.data[i].last_ob_time).getTime()) {
      weather.forecastTemp = weatherForecast.data[i].temp;
      weather.forecastSummary = weatherForecast.data[i].weather.description;
      break;
    }
  }
  return weather;
}

const showModal = (trip) => {
  document.querySelector('.caption').style.display = 'none';

  $('#tripModal').modal({
    keyboard: false
  })

  document.querySelector('.trip_title').innerHTML = `<img src="${trip.countryFlag}" class="flag"> ${trip.city}, ${trip.country}`;
  document.querySelectorAll('.media_heading')[0].innerText = `${trip.city}, ${trip.country}`;
  const tripStart = getTripDate(trip.start);
  const tripEnd = getTripDate(trip.end);
  document.querySelectorAll('.media_heading')[1].innerText = tripStart;
  document.querySelectorAll('.media_heading')[2].innerText = tripEnd;

  document.querySelectorAll('.media_heading')[3].innerText = `${countdown(trip.start, trip.end)} days`;
  document.querySelector('.images').setAttribute('src', trip.image);
  const daysLeft = countdown(new Date(), trip.start);
  document.querySelector('.trip_countdown').innerText = `Your trip to ${trip.city} is ${daysLeft} days away`;
  const weather = getWeatherInfo(trip.weatherForecast, tripStart);
  if (daysLeft < 7) {
    document.querySelector('.trip_weather').innerHTML = `<p class="mt-1">The current weather:</p>
                                                       <p class="mt-1">${weather.temperature}&deg;F</p>
                                                       <p class="mt-1">${weather.summary}</p>`;
  } else {
    document.querySelector('.trip_weather').innerHTML = `<p class="mt-1">Weather forecast for then:</p>
                                                       <p class="mt-1">${weather.forecastTemp}&deg;F</p>
                                                       <p class="mt-1">${weather.forecastSummary}</p>`;
  }

}

const displayTrip = (trip) => {


  document.querySelector('.caption').style.display = 'block';
  document.querySelector('.caption').style.top = '5vh';

  $('#tripModal').modal('toggle');

  const tripStart = getTripDate(trip.start);
  const tripEnd = getTripDate(trip.end);
  const daysLeft = countdown(new Date(), trip.start);
  const weather = getWeatherInfo(trip.weatherForecast, tripStart);

  const section = document.createElement('section');
  section.classList.add('trips');

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="card mb-3" style="max-width: 720px; margin: 0 auto">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${trip.image}" class="card-img" alt="Picture of Travel Destination">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title trip_title"><img src="${trip.countryFlag}" class="flag"> ${trip.city}, ${trip.country}</h3>
          <h6 class="mt-0">Departure: ${tripStart}</h6>
          <h6 class="mt-0">Return: ${tripEnd}</h6>
          <h6 class="mt-0">Duration: ${countdown(trip.start, trip.end)} days</h6>
          <span class="trip_countdown">Your trip to ${trip.city} is ${daysLeft} days away</span>
          <p>The current weather:</p>
          <p>${weather.temperature}&deg;F</p>
          <p>${weather.summary}</p>
        </div>
      </div>
    </div>
  </div>`;

  section.appendChild(div);
  document.querySelector('.hero').appendChild(section);
}

export {
  showModal,
  displayTrip
};
