/**
 * INDIA AQI MONITOR – API Integration
 * Fetches live data from OpenWeatherMap + WAQI APIs
 * Falls back to demo data if API keys are not configured.
 */

/**
 * Fetch all state data (live or demo)
 * @returns {Promise<Array>} Array of state objects with AQI + weather
 */
async function fetchAllStatesData() {
  if (CONFIG.USE_DEMO) {
    // Simulate network delay for realism
    await new Promise(r => setTimeout(r, 1200));
    return buildDemoData();
  }

  try {
    const results = await Promise.allSettled(
      INDIA_STATES.map(state => fetchStateData(state))
    );

    return results.map((res, i) => {
      if (res.status === 'fulfilled') return res.value;
      // Fallback to demo for failed individual requests
      const seed = DEMO_DATA_SEED[INDIA_STATES[i].id] || {};
      const aqi  = seed.aqi || 100;
      const cat  = getAQICategory(aqi);
      return { ...INDIA_STATES[i], aqi, temp: seed.temp || 30, humidity: seed.humidity || 60,
               wind: seed.wind || 10, weather: seed.weather || 'N/A', icon: seed.icon || '01d',
               ...cat, source: 'fallback' };
    });
  } catch (err) {
    console.error('API fetch error, falling back to demo data:', err);
    return buildDemoData();
  }
}

/**
 * Fetch data for a single state using live APIs
 */
async function fetchStateData(state) {
  const [weatherData, aqiData] = await Promise.all([
    fetchWeather(state),
    fetchAQI(state),
  ]);

  const aqi = aqiData;
  const cat = getAQICategory(aqi);

  return {
    ...state,
    aqi,
    temp:       Math.round(weatherData.main.temp),
    feelsLike:  Math.round(weatherData.main.feels_like),
    humidity:   weatherData.main.humidity,
    wind:       Math.round(weatherData.wind.speed * 3.6), // m/s → km/h
    pressure:   weatherData.main.pressure,
    visibility: weatherData.visibility ? Math.round(weatherData.visibility / 1000) : null,
    weather:    weatherData.weather[0].description,
    icon:       weatherData.weather[0].icon,
    ...cat,
    source: 'live',
  };
}

async function fetchWeather(state) {
  const res = await fetch(`/.netlify/functions/weather?lat=${state.lat}&lon=${state.lon}`); 
  if (!res.ok) throw new Error(`Weather API ${res.status}`);
  return res.json();
}
/**
 * WAQI: AQI by geo-coordinates
 */
async function fetchAQI(state) {
  const res = await fetch(`/.netlify/functions/aqi?lat=${state.lat}&lon=${state.lon}`); 
  if (!res.ok) throw new Error(`AQI API ${res.status}`);
  const json = await res.json();
  return parseInt(json.data.aqi, 10); // this line same
}