/* Geo-Filtered Job List Logic */
import { loadJobs } from './data-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  const jobs = await loadJobs();
  const container = document.getElementById('jobs-container');
  const filterForm = document.getElementById('job-filter-form');
  const citySelect = document.getElementById('filter-city');

  // Detect location (simple IPAPI call)
  let userCountry = 'ZA';
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    userCountry = data.country_code;
  } catch (_) {}

  function populateCities() {
    const cities = new Set();
    jobs.filter(j => j.countryCode === userCountry).forEach(j => cities.add(j.city));
    citySelect.innerHTML = '<option value="">All Cities</option>' + [...cities].map(c => `<option>${c}</option>`).join('');
  }

  function renderJobs(list) {
    container.innerHTML = list.map(j => `
      <div class="job-card">
        <div class="job-header">
          <h3 class="job-title">${j.title}</h3>
          <span class="job-company">${j.company}</span>
        </div>
        <div class="job-meta">${j.location} • ${j.type}</div>
        <p class="job-description">${j.description.substring(0, 120)}...</p>
        <button class="btn btn--primary" data-action="apply" data-job-id="${j.id}"><span>Apply Now</span><i data-feather="arrow-right"></i></button>
      </div>`).join('');
    feather.replace();
  }

  function applyFilters(e) {
    if (e) e.preventDefault();
    const title = document.getElementById('filter-title').value.toLowerCase();
    const type = document.getElementById('filter-type').value;
    const city = citySelect.value;
    const remote = document.getElementById('filter-remote').checked;

    const filtered = jobs.filter(j => {
      if (j.countryCode !== userCountry) return false;
      if (title && !j.title.toLowerCase().includes(title)) return false;
      if (type && j.type !== type) return false;
      if (city && j.city !== city) return false;
      if (remote && !j.type.includes('Remote')) return false;
      return true;
    });
    renderJobs(filtered);
  }
