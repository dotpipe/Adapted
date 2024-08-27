const CRIME_API_KEY = 'YOUR_CRIMEOMETER_API_KEY';

export const getCrimeData = async (lat, lon) => {
  const response = await axios.get(
    `https://api.crimeometer.com/v1/incidents/raw-data?lat=${lat}&lon=${lon}&distance=1km&datetime_ini=2023-01-01T00:00:00.000Z&datetime_end=2023-12-31T23:59:59.999Z&page=1&page_size=10`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CRIME_API_KEY
      }
    }
  );
  return response.data.incidents;
};