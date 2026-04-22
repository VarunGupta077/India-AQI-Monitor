/**
 * INDIA AQI MONITOR – Static State/City Data + Demo Data Generator
 * BCA Final Year Major Project
 */

// All 28 States + 8 UTs of India with representative monitoring cities
const INDIA_STATES = [
  { id: 'AN', name: 'Andaman & Nicobar Islands', city: 'Port Blair',     lat: 11.6234, lon: 92.7265,  type: 'UT' },
  { id: 'AP', name: 'Andhra Pradesh',            city: 'Visakhapatnam', lat: 17.6868, lon: 83.2185,  type: 'State' },
  { id: 'AR', name: 'Arunachal Pradesh',         city: 'Itanagar',      lat: 27.0844, lon: 93.6053,  type: 'State' },
  { id: 'AS', name: 'Assam',                     city: 'Guwahati',      lat: 26.1445, lon: 91.7362,  type: 'State' },
  { id: 'BR', name: 'Bihar',                     city: 'Patna',         lat: 25.5941, lon: 85.1376,  type: 'State' },
  { id: 'CH', name: 'Chandigarh',                city: 'Chandigarh',    lat: 30.7333, lon: 76.7794,  type: 'UT' },
  { id: 'CG', name: 'Chhattisgarh',              city: 'Raipur',        lat: 21.2514, lon: 81.6296,  type: 'State' },
  { id: 'DN', name: 'Dadra & Nagar Haveli',      city: 'Silvassa',      lat: 20.2766, lon: 73.0147,  type: 'UT' },
  { id: 'DD', name: 'Daman & Diu',               city: 'Daman',         lat: 20.3974, lon: 72.8328,  type: 'UT' },
  { id: 'DL', name: 'Delhi',                     city: 'New Delhi',     lat: 28.6139, lon: 77.2090,  type: 'UT' },
  { id: 'GA', name: 'Goa',                       city: 'Panaji',        lat: 15.4909, lon: 73.8278,  type: 'State' },
  { id: 'GJ', name: 'Gujarat',                   city: 'Ahmedabad',     lat: 23.0225, lon: 72.5714,  type: 'State' },
  { id: 'HR', name: 'Haryana',                   city: 'Gurugram',      lat: 28.4595, lon: 77.0266,  type: 'State' },
  { id: 'HP', name: 'Himachal Pradesh',          city: 'Shimla',        lat: 31.1048, lon: 77.1734,  type: 'State' },
  { id: 'JK', name: 'Jammu & Kashmir',           city: 'Srinagar',      lat: 34.0836, lon: 74.7973,  type: 'UT' },
  { id: 'JH', name: 'Jharkhand',                 city: 'Ranchi',        lat: 23.3441, lon: 85.3096,  type: 'State' },
  { id: 'KA', name: 'Karnataka',                 city: 'Bengaluru',     lat: 12.9716, lon: 77.5946,  type: 'State' },
  { id: 'KL', name: 'Kerala',                    city: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366, type: 'State' },
  { id: 'LA', name: 'Ladakh',                    city: 'Leh',           lat: 34.1526, lon: 77.5771,  type: 'UT' },
  { id: 'LD', name: 'Lakshadweep',               city: 'Kavaratti',     lat: 10.5593, lon: 72.6358,  type: 'UT' },
  { id: 'MP', name: 'Madhya Pradesh',            city: 'Bhopal',        lat: 23.2599, lon: 77.4126,  type: 'State' },
  { id: 'MH', name: 'Maharashtra',               city: 'Mumbai',        lat: 19.0760, lon: 72.8777,  type: 'State' },
  { id: 'MN', name: 'Manipur',                   city: 'Imphal',        lat: 24.8170, lon: 93.9368,  type: 'State' },
  { id: 'ML', name: 'Meghalaya',                 city: 'Shillong',      lat: 25.5788, lon: 91.8933,  type: 'State' },
  { id: 'MZ', name: 'Mizoram',                   city: 'Aizawl',        lat: 23.7307, lon: 92.7173,  type: 'State' },
  { id: 'NL', name: 'Nagaland',                  city: 'Kohima',        lat: 25.6751, lon: 94.1086,  type: 'State' },
  { id: 'OD', name: 'Odisha',                    city: 'Bhubaneswar',   lat: 20.2961, lon: 85.8245,  type: 'State' },
  { id: 'PY', name: 'Puducherry',                city: 'Puducherry',    lat: 11.9416, lon: 79.8083,  type: 'UT' },
  { id: 'PB', name: 'Punjab',                    city: 'Amritsar',      lat: 31.6340, lon: 74.8723,  type: 'State' },
  { id: 'RJ', name: 'Rajasthan',                 city: 'Jaipur',        lat: 26.9124, lon: 75.7873,  type: 'State' },
  { id: 'SK', name: 'Sikkim',                    city: 'Gangtok',       lat: 27.3389, lon: 88.6065,  type: 'State' },
  { id: 'TN', name: 'Tamil Nadu',                city: 'Chennai',       lat: 13.0827, lon: 80.2707,  type: 'State' },
  { id: 'TG', name: 'Telangana',                 city: 'Hyderabad',     lat: 17.3850, lon: 78.4867,  type: 'State' },
  { id: 'TR', name: 'Tripura',                   city: 'Agartala',      lat: 23.8315, lon: 91.2868,  type: 'State' },
  { id: 'UP', name: 'Uttar Pradesh',             city: 'Lucknow',       lat: 26.8467, lon: 80.9462,  type: 'State' },
  { id: 'UK', name: 'Uttarakhand',               city: 'Dehradun',      lat: 30.3165, lon: 78.0322,  type: 'State' },
  { id: 'WB', name: 'West Bengal',               city: 'Kolkata',       lat: 22.5726, lon: 88.3639,  type: 'State' },
];

/**
 * Realistic demo AQI & weather values seeded per state
 * so the demo looks authentic every time.
 */
const DEMO_DATA_SEED = {
  AN:  { aqi: 28,  temp: 29, humidity: 78, wind: 12, weather: 'Partly Cloudy',  icon: '02d' },
  AP:  { aqi: 72,  temp: 33, humidity: 65, wind: 14, weather: 'Haze',           icon: '50d' },
  AR:  { aqi: 22,  temp: 18, humidity: 82, wind: 8,  weather: 'Light Rain',     icon: '10d' },
  AS:  { aqi: 68,  temp: 30, humidity: 78, wind: 10, weather: 'Mostly Cloudy',  icon: '03d' },
  BR:  { aqi: 198, temp: 35, humidity: 55, wind: 6,  weather: 'Haze',           icon: '50d' },
  CH:  { aqi: 112, temp: 28, humidity: 50, wind: 15, weather: 'Clear Sky',      icon: '01d' },
  CG:  { aqi: 88,  temp: 34, humidity: 60, wind: 9,  weather: 'Partly Cloudy', icon: '02d' },
  DN:  { aqi: 45,  temp: 31, humidity: 72, wind: 11, weather: 'Mostly Cloudy', icon: '03d' },
  DD:  { aqi: 40,  temp: 32, humidity: 70, wind: 13, weather: 'Clear Sky',     icon: '01d' },
  DL:  { aqi: 342, temp: 32, humidity: 42, wind: 5,  weather: 'Severe Haze',   icon: '50d' },
  GA:  { aqi: 38,  temp: 30, humidity: 75, wind: 18, weather: 'Partly Cloudy', icon: '02d' },
  GJ:  { aqi: 142, temp: 36, humidity: 40, wind: 16, weather: 'Haze',          icon: '50d' },
  HR:  { aqi: 265, temp: 33, humidity: 38, wind: 7,  weather: 'Dense Haze',    icon: '50d' },
  HP:  { aqi: 32,  temp: 18, humidity: 58, wind: 12, weather: 'Clear Sky',     icon: '01d' },
  JK:  { aqi: 55,  temp: 12, humidity: 48, wind: 10, weather: 'Partly Cloudy', icon: '02d' },
  JH:  { aqi: 165, temp: 34, humidity: 52, wind: 8,  weather: 'Haze',          icon: '50d' },
  KA:  { aqi: 82,  temp: 27, humidity: 60, wind: 14, weather: 'Partly Cloudy', icon: '02d' },
  KL:  { aqi: 42,  temp: 29, humidity: 80, wind: 20, weather: 'Light Drizzle', icon: '09d' },
  LA:  { aqi: 18,  temp: 4,  humidity: 22, wind: 18, weather: 'Clear Sky',     icon: '01d' },
  LD:  { aqi: 14,  temp: 28, humidity: 82, wind: 22, weather: 'Clear Sky',     icon: '01d' },
  MP:  { aqi: 122, temp: 35, humidity: 45, wind: 10, weather: 'Haze',          icon: '50d' },
  MH:  { aqi: 135, temp: 31, humidity: 68, wind: 16, weather: 'Partly Cloudy', icon: '02d' },
  MN:  { aqi: 30,  temp: 22, humidity: 80, wind: 8,  weather: 'Mostly Cloudy', icon: '03d' },
  ML:  { aqi: 24,  temp: 20, humidity: 84, wind: 10, weather: 'Light Rain',    icon: '10d' },
  MZ:  { aqi: 26,  temp: 21, humidity: 82, wind: 9,  weather: 'Mostly Cloudy', icon: '03d' },
  NL:  { aqi: 28,  temp: 19, humidity: 78, wind: 7,  weather: 'Partly Cloudy', icon: '02d' },
  OD:  { aqi: 98,  temp: 33, humidity: 62, wind: 14, weather: 'Haze',          icon: '50d' },
  PY:  { aqi: 56,  temp: 31, humidity: 72, wind: 16, weather: 'Clear Sky',     icon: '01d' },
  PB:  { aqi: 218, temp: 30, humidity: 44, wind: 8,  weather: 'Dense Haze',    icon: '50d' },
  RJ:  { aqi: 152, temp: 40, humidity: 22, wind: 20, weather: 'Dust Haze',     icon: '50d' },
  SK:  { aqi: 15,  temp: 14, humidity: 72, wind: 10, weather: 'Clear Sky',     icon: '01d' },
  TN:  { aqi: 88,  temp: 33, humidity: 68, wind: 18, weather: 'Partly Cloudy', icon: '02d' },
  TG:  { aqi: 108, temp: 35, humidity: 48, wind: 12, weather: 'Haze',          icon: '50d' },
  TR:  { aqi: 38,  temp: 28, humidity: 80, wind: 8,  weather: 'Mostly Cloudy', icon: '03d' },
  UP:  { aqi: 298, temp: 34, humidity: 40, wind: 5,  weather: 'Severe Haze',   icon: '50d' },
  UK:  { aqi: 65,  temp: 22, humidity: 55, wind: 14, weather: 'Partly Cloudy', icon: '02d' },
  WB:  { aqi: 158, temp: 33, humidity: 70, wind: 12, weather: 'Haze',          icon: '50d' },
};

/**
 * Determine AQI category from numeric value
 * Uses CPCB (India) / US-EPA scale
 */
function getAQICategory(aqi) {
  if (aqi <= 50)  return { cat: 'good',         label: 'Good',       cssClass: 'good',        color: '#22c55e', advice: 'Air quality is satisfactory. Enjoy outdoor activities freely.' };
  if (aqi <= 100) return { cat: 'satisfactory',  label: 'Satisfactory','cssClass': 'satisfactory', color: '#a3e635', advice: 'Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.' };
  if (aqi <= 200) return { cat: 'moderate',      label: 'Moderate',   cssClass: 'moderate',    color: '#eab308', advice: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' };
  if (aqi <= 300) return { cat: 'poor',          label: 'Poor',       cssClass: 'poor',        color: '#f97316', advice: 'Everyone may begin to experience health effects. Members of sensitive groups may experience more serious effects.' };
  if (aqi <= 400) return { cat: 'very-poor',     label: 'Very Poor',  cssClass: 'very-poor',   color: '#ef4444', advice: 'Health warnings of emergency conditions. Avoid all outdoor physical activity. Use N95/N99 mask if going out.' };
  return           { cat: 'severe',              label: 'Severe',     cssClass: 'severe',      color: '#9333ea', advice: 'Emergency conditions. All outdoor activities should be avoided. Keep windows shut and use air purifiers.' };
}

/**
 * Get a small random variation to simulate live updates
 */
function liveVariation(base, range = 8) {
  return Math.max(1, Math.round(base + (Math.random() * range * 2 - range)));
}

/**
 * Build demo dataset (with slight randomisation per load)
 */
function buildDemoData() {
  return INDIA_STATES.map(state => {
    const seed = DEMO_DATA_SEED[state.id] || { aqi: 100, temp: 28, humidity: 60, wind: 12, weather: 'Clear', icon: '01d' };
    const aqi  = liveVariation(seed.aqi, 5);
    const cat  = getAQICategory(aqi);
    return {
      ...state,
      aqi,
      temp: liveVariation(seed.temp, 1),
      feelsLike: liveVariation(seed.temp - 2, 1),
      humidity: seed.humidity,
      wind: seed.wind,
      pressure: liveVariation(1013, 10),
      visibility: liveVariation(8, 3),
      weather: seed.weather,
      icon: seed.icon,
      ...cat,
      source: 'demo',
    };
  });
}
