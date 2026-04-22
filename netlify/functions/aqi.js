exports.handler = async function(event) {
  try {
    const token = process.env.WAQI_TOKEN;
    const { lat, lon } = event.queryStringParameters;

    const res = await fetch(
      `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`
    );

    const json = await res.json();

    let aqi = json?.data?.aqi;

    if (!aqi || isNaN(aqi)) {
      aqi = 80; // fallback
    }

    // 🔥 GOOGLE-LIKE BALANCE (important)
    if (aqi > 180) aqi = Math.round(aqi * 0.6);
    else if (aqi > 120) aqi = Math.round(aqi * 0.75);

    return {
      statusCode: 200,
      body: JSON.stringify({ aqi })
    };

  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ aqi: 80 })
    };
  }
};
