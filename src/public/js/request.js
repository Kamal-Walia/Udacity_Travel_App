const geonamesUrl = 'http://api.geonames.org/';
const geonamesKey = 'kamalw';
const geonamesQuery = 'searchJSON?formatted=true&q=';

const weatherbitURL = 'http://api.weatherbit.io/v2.0/current';
const weatherbitKey = 'e6d7d63153b5436da744d45f07910b16';

const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayKey = '16854317-09738b7c64d7c406fa50eefa2';
const restCountriesURL = 'https://restcountries.eu/rest/v2/alpha/'



const getGeoLocation = async(location) => {
  const endpoint = `${geonamesUrl}${geonamesQuery}${location}&username=${geonamesKey}&style=full`;
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const location = {};
      const jsonRes = await response.json();
      location.latitude = jsonRes.geonames[0].lat;
      location.longitude = jsonRes.geonames[0].lng;
      location.countryCode = jsonRes.geonames[0].countryCode;
      return location;
    }
  } catch (error) {
    console.log(error);
  }
}

const getWeatherForecast = async (latitude, longitude) => {
  const endpoint = `${weatherbitURL}?lat=${latitude}&lon=${longitude}&key=${weatherbitKey}`;
  try {
    const response = await fetch('http://localhost:8080/forecast',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: endpoint })
      });
    if (response.ok) {
      const jsonRes = await response.json();
      return jsonRes;
    }
  } catch (error) {
    console.log(error);
  }
}

const getImageURL = async(city, country) => {
  const queryCity = `&q=${city}&image_type=photo&pretty=true&category=places`;
  const queryCountry = `&q=${country}&image_type=photo&pretty=true&category=places`
  const cityEndpoint = pixabayURL + pixabayKey + queryCity;
  const countryEndpoint = pixabayURL + pixabayKey + queryCountry;
  try {
    let response = await fetch(cityEndpoint);
    if (response.ok) {
      let jsonRes = await response.json();
      if (jsonRes.totalHits === 0) {
        response = await fetch(countryEndpoint);
        if (response.ok) {
          jsonRes = await response.json();
          return jsonRes.hits[0].largeImageURL;
        }
      }
      return jsonRes.hits[0].largeImageURL;
    }
  } catch (error) {
    console.log(error);
  }
}

const getCountryInfo = async (countryCode) => {
  const endpoint = `${restCountriesURL}${countryCode}`
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const jsonRes = await response.json();
      return {
        name: jsonRes.name,
        flag: jsonRes.flag
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export { getGeoLocation, getImageURL, getCountryInfo, getWeatherForecast };

