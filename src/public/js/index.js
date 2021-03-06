import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.min.scss';
import 'bootstrap';
const $ = require("jquery");
import { getCity, getTripStart, getTripEnd } from './utils'
import { getGeoLocation, getWeatherForecast, getImageURL, getCountryInfo } from './request';
import { showModal, displayTrip } from './ui';

const trip = {};

const handleSearch = async (evt) => {
  evt.preventDefault();
  trip.city = getCity();
  trip.start = getTripStart();
  trip.end = getTripEnd();

  const geoLocation = await getGeoLocation(trip.city);

  trip.latitude = geoLocation.latitude;
  trip.longitude = geoLocation.longitude;
  trip.countryCode = geoLocation.countryCode;

  trip.weatherForecast = await getWeatherForecast(geoLocation.latitude, geoLocation.longitude);

  const countryInfo = await getCountryInfo(trip.countryCode);

  trip.country = countryInfo.name;
  trip.countryFlag = countryInfo.flag;

  trip.image = await getImageURL(trip.city, trip.country);

  showModal(trip);
}

const handleSave = async (evt) => {
  evt.preventDefault();
  try {
    const response = await fetch('http://localhost:8080/save',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trip: trip })
      });
    if (response.ok) {
      const jsonRes = await response.json();
      displayTrip(jsonRes);
      return jsonRes;
    }
  } catch (error) {
    console.log(error);
  }
}

const handleCancel = (evt) => {
  evt.preventDefault();
  $('#tripModal').modal('toggle');
  document.querySelector('.caption').style.display = 'block';
}

document.getElementById('button_search').addEventListener('click', handleSearch);
document.querySelector('.trip_save').addEventListener('click', handleSave)

document.querySelectorAll('.trip_cancel').forEach(element => {
  element.addEventListener('click', handleCancel);
});
