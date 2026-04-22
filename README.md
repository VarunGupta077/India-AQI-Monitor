# 🌬️ India AQI Monitor
### Real-Time Air Quality Index Dashboard  
**BCA Final Year Major Project**

---

## 📋 Project Overview

**India AQI Monitor** is a comprehensive, responsive web application that displays live Air Quality Index (AQI) data, weather conditions, and temperature information for all 36 States and Union Territories of India.

Built with pure HTML5, CSS3, and JavaScript (no backend required), the project integrates with:
- **OpenWeatherMap API** – Live weather & temperature data
- **WAQI (World Air Quality Index) API** – Live AQI readings by geo-coordinates

---

## ✅ Completed Features

| Feature | Status |
|---------|--------|
| Dashboard with all 36 Indian States & UTs | ✅ |
| Live AQI data display per state | ✅ |
| Live weather & temperature data | ✅ |
| Color-coded AQI category indicators | ✅ |
| Search by state name / city / code | ✅ |
| Filter by AQI category | ✅ |
| Sort by name / AQI / temperature | ✅ |
| Grid & List view toggle | ✅ |
| Interactive state detail modal | ✅ |
| Health advisory per AQI level | ✅ |
| Bar chart – Top 15 Polluted States | ✅ |
| Doughnut chart – AQI Category Distribution | ✅ |
| Bar chart – Temperature Across States | ✅ |
| Scatter chart – AQI vs Temperature Correlation | ✅ |
| Hero stats panel with animated counters | ✅ |
| Auto-refresh every 10 minutes | ✅ |
| AQI information / education section | ✅ |
| Responsive – Desktop, Tablet, Mobile | ✅ |
| Demo data fallback (works without API keys) | ✅ |

---

## 🚀 How to Run

### Option 1: Demo Mode (No Setup Required)
Simply open `index.html` in a browser. The app will display realistic simulated data for all Indian states.

### Option 2: Live Data Mode

1. **Get a free OpenWeatherMap API key:**  
   → https://openweathermap.org/appid (Free tier: 1,000 calls/day)

2. **Get a free WAQI token:**  
   → https://aqicn.org/data-platform/token/ (Free)

3. **Edit `js/config.js`:**
   ```js
   OWM_API_KEY: 'your_actual_openweathermap_key',
   WAQI_TOKEN:  'your_actual_waqi_token',
   ```

4. Open `index.html` — live data will now be fetched automatically.

---

## 📁 File Structure

```
/
├── index.html          # Main HTML page (single-page app)
├── css/
│   └── style.css       # Full responsive stylesheet
├── js/
│   ├── config.js       # API key configuration
│   ├── data.js         # State data + demo data generator
│   ├── api.js          # OpenWeatherMap & WAQI API integration
│   ├── charts.js       # Chart.js visualizations (4 charts)
│   └── app.js          # Main application logic (events, filters, rendering)
└── README.md
```

---

## 🎨 AQI Color Scale (CPCB India Standard)

| AQI Range | Category | Color |
|-----------|----------|-------|
| 0 – 50 | Good | 🟢 Green |
| 51 – 100 | Satisfactory | 🟡 Yellow-Green |
| 101 – 200 | Moderate | 🟡 Yellow |
| 201 – 300 | Poor | 🟠 Orange |
| 301 – 400 | Very Poor | 🔴 Red |
| 401+ | Severe | 🟣 Purple |

---

## 📊 Data Models

### State Object
```json
{
  "id": "DL",
  "name": "Delhi",
  "city": "New Delhi",
  "lat": 28.6139,
  "lon": 77.2090,
  "type": "UT",
  "aqi": 342,
  "temp": 32,
  "feelsLike": 30,
  "humidity": 42,
  "wind": 5,
  "pressure": 1008,
  "visibility": 4,
  "weather": "Haze",
  "icon": "50d",
  "cat": "very-poor",
  "label": "Very Poor",
  "cssClass": "very-poor",
  "color": "#ef4444",
  "advice": "Health alert...",
  "source": "live"
}
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, animations, responsive design |
| JavaScript (ES6+) | Application logic, API calls |
| Chart.js 4.4 | Data visualization (4 chart types) |
| Font Awesome 6.4 | Icons |
| Google Fonts (Inter, Poppins) | Typography |
| OpenWeatherMap API | Weather & temperature data |
| WAQI API | Air Quality Index data |

---

## 📱 Entry Points

| Path | Description |
|------|-------------|
| `index.html` | Main dashboard (default entry) |

**URL Parameters:** None (all interactions are client-side)

---

## 🔮 Recommended Next Steps

1. **Map View** – Add an interactive India map with color-coded states using Leaflet.js
2. **Historical Trends** – Store readings in localStorage and show 7-day AQI trend lines
3. **Notifications** – Browser push notifications when AQI exceeds threshold
4. **Export Feature** – Allow downloading AQI data as CSV/PDF report
5. **Pollutant Breakdown** – Show PM2.5, PM10, NO2, SO2, O3 individually
6. **Comparison Tool** – Side-by-side state comparison
7. **Dark/Light Mode** – Theme toggle

---

## 👨‍🎓 Academic Information

- **Project Type:** BCA Final Year Major Project
- **Subject:** Web Technology / Internet Technologies
- **Technologies:** HTML5, CSS3, JavaScript, REST APIs, Chart.js

---

*Built with ❤️ using HTML5, CSS3 & JavaScript*
