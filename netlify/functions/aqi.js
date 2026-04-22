exports.handler = async function(event) {
  const token = process.env.WAQI_TOKEN;
  const { lat, lon } = event.queryStringParameters;

  const res = await fetch(
    `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`
  );

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};