exports.handler = async function(event) {
  const token = process.env.WAQI_TOKEN;
  const { lat, lon } = event.queryStringParameters;

  // 🔎 nearby stations (important change)
  const bounds = `${lat-0.3},${lon-0.3},${lat+0.3},${lon+0.3}`;

  const res = await fetch(
    `https://api.waqi.info/map/bounds/?token=${token}&latlng=${bounds}`
  );

  const json = await res.json();

  if (json.status !== "ok") {
    return {
      statusCode: 200,
      body: JSON.stringify({ aqi: null })
    };
  }

  // 👉 sab stations ke AQI nikalo
  let values = json.data
    .map(s => parseInt(s.aqi))
    .filter(v => !isNaN(v));

  if (!values.length) {
    return {
      statusCode: 200,
      body: JSON.stringify({ aqi: null })
    };
  }

  // 🔥 spike remove (IMPORTANT)
  values = values.filter(v => v < 200);

  if (!values.length) {
    values = json.data.map(s => parseInt(s.aqi)).filter(v => !isNaN(v));
  }

  // 🔥 average
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

  return {
    statusCode: 200,
    body: JSON.stringify({ aqi: avg })
  };
};
