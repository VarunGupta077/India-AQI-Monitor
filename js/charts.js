/**
 * INDIA AQI MONITOR – Chart.js Visualizations
 * BCA Final Year Major Project
 */

// Store chart instances so they can be destroyed & re-created on refresh
const CHARTS = {};

const CHART_DEFAULTS = {
  color: 'rgba(255,255,255,0.7)',
  font: { family: 'Inter', size: 11 },
};

Chart.defaults.color = CHART_DEFAULTS.color;
Chart.defaults.font  = CHART_DEFAULTS.font;

/**
 * Render / update all charts with the given dataset
 * @param {Array} data - processed state array
 */
function renderCharts(data) {
  renderBarChart(data);
  renderPieChart(data);
  renderTempChart(data);
  renderScatterChart(data);
}

/* -------------------------------------------------------
   1. BAR CHART – Top 15 Most Polluted States
------------------------------------------------------- */
function renderBarChart(data) {
  const sorted = [...data].sort((a, b) => b.aqi - a.aqi).slice(0, 15);
  const labels = sorted.map(s => s.name.replace(' Pradesh', ' Pr.').replace(' & ', ' & '));
  const values = sorted.map(s => s.aqi);
  const colors = sorted.map(s => getAQICategory(s.aqi).color);

  const ctx = document.getElementById('bar-chart').getContext('2d');
  if (CHARTS.bar) CHARTS.bar.destroy();

  CHARTS.bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'AQI Value',
        data: values,
        backgroundColor: colors.map(c => c + 'cc'),
        borderColor: colors,
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const cat = getAQICategory(ctx.raw);
              return ` AQI: ${ctx.raw}  (${cat.label})`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { maxRotation: 40, minRotation: 30, font: { size: 10 } }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.07)' },
          ticks: {
            callback: v => v,
          },
          // Draw AQI category zones
          afterDataLimits: scale => { scale.max = Math.max(scale.max, 420); }
        }
      }
    }
  });
}

/* -------------------------------------------------------
   2. PIE / DOUGHNUT CHART – AQI Category Distribution
------------------------------------------------------- */
function renderPieChart(data) {
  const cats = {
    'Good (0–50)':          { count: 0, color: '#22c55e' },
    'Satisfactory (51–100)':{ count: 0, color: '#a3e635' },
    'Moderate (101–200)':   { count: 0, color: '#eab308' },
    'Poor (201–300)':       { count: 0, color: '#f97316' },
    'Very Poor (301–400)':  { count: 0, color: '#ef4444' },
    'Severe (401+)':        { count: 0, color: '#9333ea' },
  };

  data.forEach(s => {
    if      (s.aqi <=  50) cats['Good (0–50)'].count++;
    else if (s.aqi <= 100) cats['Satisfactory (51–100)'].count++;
    else if (s.aqi <= 200) cats['Moderate (101–200)'].count++;
    else if (s.aqi <= 300) cats['Poor (201–300)'].count++;
    else if (s.aqi <= 400) cats['Very Poor (301–400)'].count++;
    else                   cats['Severe (401+)'].count++;
  });

  const labels = Object.keys(cats).filter(k => cats[k].count > 0);
  const values = labels.map(k => cats[k].count);
  const colors = labels.map(k => cats[k].color);

  const ctx = document.getElementById('pie-chart').getContext('2d');
  if (CHARTS.pie) CHARTS.pie.destroy();

  CHARTS.pie = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors.map(c => c + 'cc'),
        borderColor: colors,
        borderWidth: 2,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'right',
          labels: { boxWidth: 12, padding: 12, font: { size: 10 } }
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.raw} state(s)`
          }
        }
      }
    }
  });
}

/* -------------------------------------------------------
   3. HORIZONTAL BAR – Temperature Distribution
------------------------------------------------------- */
function renderTempChart(data) {
  const sorted = [...data].sort((a, b) => b.temp - a.temp).slice(0, 14);
  const labels = sorted.map(s => s.id);
  const values = sorted.map(s => s.temp);
  const colors = values.map(t => {
    if (t >= 40) return '#ef4444';
    if (t >= 35) return '#f97316';
    if (t >= 30) return '#eab308';
    if (t >= 25) return '#22c55e';
    if (t >= 15) return '#38bdf8';
    return '#6366f1';
  });

  const ctx = document.getElementById('temp-chart').getContext('2d');
  if (CHARTS.temp) CHARTS.temp.destroy();

  CHARTS.temp = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Temperature (°C)',
        data: values,
        backgroundColor: colors.map(c => c + 'bb'),
        borderColor: colors,
        borderWidth: 1.5,
        borderRadius: 4,
        indexAxis: 'y',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: ctx => {
              const s = data.find(d => d.id === ctx[0].label);
              return s ? s.name : ctx[0].label;
            },
            label: ctx => ` Temperature: ${ctx.raw}°C`
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.06)' },
          ticks: { callback: v => `${v}°C` }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { font: { size: 10 } }
        }
      }
    }
  });
}

/* -------------------------------------------------------
   4. SCATTER CHART – AQI vs Temperature
------------------------------------------------------- */
function renderScatterChart(data) {
  const points = data.map(s => ({ x: s.temp, y: s.aqi, name: s.name }));
  const colorPts = data.map(s => getAQICategory(s.aqi).color + 'cc');

  const ctx = document.getElementById('scatter-chart').getContext('2d');
  if (CHARTS.scatter) CHARTS.scatter.destroy();

  CHARTS.scatter = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'States',
        data: points,
        backgroundColor: colorPts,
        borderColor: colorPts.map(c => c.slice(0, -2) + 'ff'),
        borderWidth: 1,
        pointRadius: 7,
        pointHoverRadius: 10,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const pt = ctx.raw;
              return ` ${pt.name}  |  Temp: ${pt.x}°C  |  AQI: ${pt.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Temperature (°C)', color: 'rgba(255,255,255,0.5)' },
          grid: { color: 'rgba(255,255,255,0.06)' },
        },
        y: {
          title: { display: true, text: 'AQI', color: 'rgba(255,255,255,0.5)' },
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.06)' },
        }
      }
    }
  });
}
