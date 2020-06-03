import request from '../__mocks__/saveTripRequest';

const trip = {
  city: 'Paris',
  countryCode: 'FR',
  country: 'France'
};

const handleSave = async () => await request(trip)

it('Should return an array containing trip object', async function() {

  const response = await handleSave();
  expect(response[0].country).toEqual('France');
})