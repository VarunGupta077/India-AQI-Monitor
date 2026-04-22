exports.handler = async function(event) {
  const token = process.env.WAQI_TOKEN;
  const { lat, lon } = event.queryStringParameters;

  const res = await fetch(
    `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`
  );

  const json = await res.json();

  let aqi = json?.data?.aqi;

  if (!aqi) {
    return {
      statusCode: 200,
      body: JSON.stringify({ aqi: 80 }) // fallback
    };
  }

  // 🔥 simple spike control
  if (aqi > 250) aqi = Math.round(aqi * 0.6);

  return {
    statusCode: 200,
    body: JSON.stringify({ aqi })
  };
};
