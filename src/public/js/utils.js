const getCity = () => {

  let city = document.getElementById('city').value;

  city = city.toLowerCase();
  city = city[0].toUpperCase() + city.slice(1);

  return city;
}

const getTripStart = () => document.getElementById('date_start').value.split('-').join('/');

const getTripEnd = () => document.getElementById('date_end').value.split('-').join('/');

const countdown = (start, end) => {

  const tripStart = Date.parse(start);
  const tripEnd = Date.parse(end);

  const countdown = tripEnd - tripStart;

  const daysLeft = Math.ceil(countdown / 86400000);

  return daysLeft;
}

export { 
  getCity,
  getTripStart,
  getTripEnd,
  countdown 
};