exports.handler = async function(event) {
  const key = process.env.OWM_API_KEY;
  const { lat, lon } = event.queryStringParameters;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
  );

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};