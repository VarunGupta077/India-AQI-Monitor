/**
 * INDIA AQI MONITOR – Con
 * iguration
 * BCA Final Year Major Project
 *
 * HOW TO USE LIVE DATA:
 * 1. Get a free API key from https://openweathermap.org/api
 * 2. Get a free token from https://aqicn.org/data-platform/token/
 * 3. Replace the placeholder values below
 *
 * If keys are not set, the app will use realistic demo data.
 */

const CONFIG = {
  // OpenWeatherMap API (free tier: https://openweathermap.org/api)
  OWM_API_KEY: '',

  // WAQI (World Air Quality Index) token (free: https://aqicn.org/data-platform/token/)
  WAQI_TOKEN: '',

  // Auto-refresh interval (ms) – 10 minutes
  REFRESH_INTERVAL: 10 * 60 * 1000,

  // API base URLs
  OWM_BASE: 'https://api.openweathermap.org/data/2.5',
  WAQI_BASE: 'https://api.waqi.info',

  // Use demo data when API keys are missing
  get USE_DEMO() {
    return this.OWM_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY' ||
           this.WAQI_TOKEN   === 'YOUR_WAQI_TOKEN';
  }
};
