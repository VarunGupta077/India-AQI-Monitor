/**
 * INDIA AQI MONITOR – Main Application Logic
 * BCA Final Year Major Project
 */

/* ============================================================
   STATE
   ============================================================ */
let allData      = [];    // Full dataset
let filteredData = [];    // After search / filter / sort
let viewMode     = 'grid'; // 'grid' | 'list'
let refreshTimer = null;

/* ============================================================
   DOM ELEMENTS
   ============================================================ */
const el = {
  grid:          document.getElementById('states-grid'),
  loading:       document.getElementById('loading-overlay'),
  errorMsg:      document.getElementById('error-msg'),
  errorDetail:   document.getElementById('error-detail'),
  noResults:     document.getElementById('no-results'),
  searchInput:   document.getElementById('search-input'),
  clearSearch:   document.getElementById('clear-search'),
  aqiFilter:     document.getElementById('aqi-filter'),
  sortSelect:    document.getElementById('sort-select'),
  viewGrid:      document.getElementById('view-grid'),
  viewList:      document.getElementById('view-list'),
  refreshBtn:    document.getElementById('refresh-btn'),
  lastUpdated:   document.getElementById('last-updated'),
  totalStates:   document.getElementById('total-states'),
  countGood:     document.getElementById('count-good'),
  countModerate: document.getElementById('count-moderate'),
  countUnhealthy:document.getElementById('count-unhealthy'),
  avgAqi:        document.getElementById('avg-aqi'),
};

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  loadData();

  // Auto-refresh
  refreshTimer = setInterval(loadData, 600000);
});

/* ============================================================
   EVENTS
   ============================================================ */
function bindEvents() {
  el.searchInput.addEventListener('input',  applyFilters);
  el.aqiFilter.addEventListener('change',   applyFilters);
  el.sortSelect.addEventListener('change',  applyFilters);
  el.clearSearch.addEventListener('click',  clearSearch);
  el.refreshBtn.addEventListener('click',   () => loadData(true));
  el.viewGrid.addEventListener('click',     () => setView('grid'));
  el.viewList.addEventListener('click',     () => setView('list'));

  // Keyboard shortcut: Ctrl+R → refresh
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') { e.preventDefault(); loadData(true); }
  });
}

/* ============================================================
   LOAD DATA
   ============================================================ */
async function loadData(manual = false) {
  if (manual) {
    el.refreshBtn.classList.add('spinning');
  } else {
    showLoading(true);
  }

  try {
    allData = await fetchAllStatesData();
    filteredData = [...allData];
    applyFilters();
    updateStats();
    renderCharts(allData);
    updateTimestamp();

    if (CONFIG.USE_DEMO) {
      el.errorMsg.classList.remove('hidden');
      el.errorDetail.textContent =
        'Showing demo/simulated data. Add your API keys in js/config.js to fetch live data from OpenWeatherMap & WAQI APIs.';
    }
  } catch (err) {
    console.error('Load error:', err);
    if (allData.length === 0) {
      allData = buildDemoData();
      filteredData = [...allData];
      applyFilters();
      updateStats();
      renderCharts(allData);
    }
    el.errorMsg.classList.remove('hidden');
    el.errorDetail.textContent = `Error: ${err.message}. Showing demo data.`;
  } finally {
    showLoading(false);
    el.refreshBtn.classList.remove('spinning');
  }
}

/* ============================================================
   FILTER / SORT / RENDER
   ============================================================ */
function applyFilters() {
  const query  = el.searchInput.value.toLowerCase().trim();
  const filter = el.aqiFilter.value;
  const sort   = el.sortSelect.value;

  // Show / hide clear button
  el.clearSearch.style.display = query ? 'block' : 'none';

  // 1. Filter
  filteredData = allData.filter(state => {
    const matchSearch =
      !query ||
      state.name.toLowerCase().includes(query) ||
      state.city.toLowerCase().includes(query) ||
      state.id.toLowerCase().includes(query);

    const matchFilter = (() => {
      if (filter === 'all') return true;
      const cat = state.cat;
      if (filter === 'good'      && cat === 'good')        return true;
      if (filter === 'satisfactory' && cat === 'satisfactory') return true;
      if (filter === 'moderate'  && cat === 'moderate')    return true;
      if (filter === 'poor'      && cat === 'poor')        return true;
      if (filter === 'very-poor' && cat === 'very-poor')   return true;
      if (filter === 'severe'    && cat === 'severe')      return true;
      return false;
    })();

    return matchSearch && matchFilter;
  });

  // 2. Sort
  filteredData.sort((a, b) => {
    switch (sort) {
      case 'aqi-asc':  return a.aqi - b.aqi;
      case 'aqi-desc': return b.aqi - a.aqi;
      case 'temp':     return b.temp - a.temp;
      case 'state':
      default:         return a.name.localeCompare(b.name);
    }
  });

  // 3. Render
  renderGrid();
}

function clearSearch() {
  el.searchInput.value = '';
  el.aqiFilter.value   = 'all';
  el.sortSelect.value  = 'state';
  applyFilters();
}

/* global */ function resetFilters() { clearSearch(); }

/* ============================================================
   RENDER GRID / LIST
   ============================================================ */
function renderGrid() {
  if (filteredData.length === 0) {
    el.grid.innerHTML = '';
    el.noResults.classList.remove('hidden');
    return;
  }

  el.noResults.classList.add('hidden');

  el.grid.innerHTML = filteredData.map((state, i) => buildCard(state, i)).join('');

  // Stagger animation delay
  el.grid.querySelectorAll('.state-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.03}s`;
  });

  // Animate AQI bars
  setTimeout(() => {
    el.grid.querySelectorAll('.aqi-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 50);
}

function buildCard(state, index) {
  const barWidth = Math.min(100, Math.round((state.aqi / 500) * 100));
  const weatherIconUrl = `https://openweathermap.org/img/wn/${state.icon}.png`;

  return `
    <article class="state-card ${state.cssClass}"
             onclick="openModal('${state.id}')"
             title="Click for detailed view of ${state.name}">

      <div class="card-header">
        <div>
          <div class="state-name">${state.name}</div>
          <div class="state-type">${state.type} · ${state.city}</div>
        </div>
        <div class="aqi-badge ${state.cssClass}">
          <div class="aqi-val">${state.aqi}</div>
          <div class="aqi-cat">${state.label}</div>
        </div>
      </div>

      <div class="aqi-bar-wrap">
        <div class="aqi-bar-bg">
          <div class="aqi-bar-fill" style="width: 0%" data-width="${barWidth}%"></div>
        </div>
      </div>

      <div class="weather-row">
        <div class="weather-item">
          <i class="fas fa-thermometer-half"></i>
          <span class="temp-val">${state.temp}°C</span>
        </div>
        <div class="weather-item">
          <i class="fas fa-tint"></i>
          <span>${state.humidity}%</span>
        </div>
        <div class="weather-item">
          <i class="fas fa-wind"></i>
          <span>${state.wind} km/h</span>
        </div>
        <div class="weather-desc">${state.weather}</div>
      </div>

      <div class="card-footer">
        <div class="city-name">
          <i class="fas fa-map-marker-alt"></i>
          ${state.city}
        </div>
        <div>${state.source === 'live' ? '<span style="color:#4ade80">● Live</span>' : '<span style="color:#94a3b8">● Demo</span>'}</div>
      </div>
    </article>
  `;
}

/* ============================================================
   STATS PANEL
   ============================================================ */
function updateStats() {
  const total    = allData.length;
  const good     = allData.filter(s => s.aqi <= 100).length;
  const moderate = allData.filter(s => s.aqi > 100 && s.aqi <= 200).length;
  const unhealthy= allData.filter(s => s.aqi > 200).length;
  const avg      = Math.round(allData.reduce((sum, s) => sum + s.aqi, 0) / total);

  animateCount(el.totalStates,   total);
  animateCount(el.countGood,     good);
  animateCount(el.countModerate, moderate);
  animateCount(el.countUnhealthy,unhealthy);
  animateCount(el.avgAqi,        avg);
}

function animateCount(el, target) {
  const start    = parseInt(el.textContent) || 0;
  const duration = 800;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(start + (target - start) * eased);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ============================================================
   MODAL
   ============================================================ */
function openModal(stateId) {
  const state = allData.find(s => s.id === stateId);
  if (!state) return;

  const cat = getAQICategory(state.aqi);
  const advisoryClass = cat.cssClass;

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-state-name">${state.name}</div>
    <div class="modal-city">
      <i class="fas fa-map-marker-alt"></i>
      ${state.city} · ${state.type}
      <span style="color:var(--text-muted); margin-left:8px; font-size:0.72rem;">
        ${state.lat.toFixed(2)}°N, ${state.lon.toFixed(2)}°E
      </span>
    </div>

    <div class="modal-aqi-big ${advisoryClass}-bg"
         style="border:1px solid ${cat.color}33;">
      <div class="modal-aqi-num" style="color:${cat.color}">${state.aqi}</div>
      <div class="modal-aqi-label" style="color:${cat.color}">${cat.label}</div>
      <div class="modal-aqi-desc" style="color:${cat.color}99;">
        Air Quality Index (AQI)
      </div>
    </div>

    <div class="modal-grid">
      <div class="modal-stat">
        <div class="modal-stat-label"><i class="fas fa-thermometer-half"></i> Temperature</div>
        <div class="modal-stat-value">${state.temp}°C</div>
      </div>
      <div class="modal-stat">
        <div class="modal-stat-label"><i class="fas fa-temperature-low"></i> Feels Like</div>
        <div class="modal-stat-value">${state.feelsLike ?? state.temp - 2}°C</div>
      </div>
      <div class="modal-stat">
        <div class="modal-stat-label"><i class="fas fa-tint"></i> Humidity</div>
        <div class="modal-stat-value">${state.humidity}%</div>
      </div>
      <div class="modal-stat">
        <div class="modal-stat-label"><i class="fas fa-wind"></i> Wind Speed</div>
        <div class="modal-stat-value">${state.wind} km/h</div>
      </div>
      <div class="modal-stat">
        <div class="modal-stat-label"><i class="fas fa-compress-arrows-alt"></i> Pressure</div>
        <div class="modal-stat-value">${state.pressure ?? '—'} hPa</div>
      </div>
      <div class="modal-stat">
        <div class="modal-stat-label"><i class="fas fa-eye"></i> Visibility</div>
        <div class="modal-stat-value">${state.visibility ? state.visibility + ' km' : '—'}</div>
      </div>
    </div>

    <div class="modal-stat" style="margin-bottom:16px;">
      <div class="modal-stat-label"><i class="fas fa-cloud"></i> Weather Condition</div>
      <div class="modal-stat-value" style="font-size:0.95rem; text-transform:capitalize;">${state.weather}</div>
    </div>

    <div class="modal-advice">
      <strong><i class="fas fa-heartbeat" style="margin-right:6px;"></i>Health Advisory</strong>
      ${cat.advice}
    </div>
  `;

  document.getElementById('modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/* global */ function closeModal(event) {
  if (event && event.target !== document.getElementById('modal-overlay') && event.type === 'click') return;
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ============================================================
   VIEW TOGGLE
   ============================================================ */
function setView(mode) {
  viewMode = mode;
  el.grid.classList.toggle('list-view', mode === 'list');
  el.viewGrid.classList.toggle('active', mode === 'grid');
  el.viewList.classList.toggle('active', mode === 'list');
}

/* ============================================================
   LOADING
   ============================================================ */
function showLoading(show) {
  el.loading.style.display = show ? 'flex' : 'none';
  if (show) el.grid.innerHTML = '';
}

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */
(function () {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
})();

/* ============================================================
   TIMESTAMP
   ============================================================ */
function updateTimestamp() {
  const now = new Date();
  el.lastUpdated.textContent = `Last updated: ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
}
