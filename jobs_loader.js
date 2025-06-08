<script>
document.addEventListener('DOMContentLoaded', () => {
  const jobsContainer = document.getElementById('job-listings');

  fetch('jobs/jobs.json')
    .then(response => response.json())
    .then(data => {
      if (!Array.isArray(data)) {
        jobsContainer.innerHTML = "<p>No job data found.</p>";
        return;
      }

      data.forEach(job => {
        const jobCard = document.createElement('li');
        jobCard.className = 'featured';

        jobCard.innerHTML = `
          <a href="${job.url}" target="_blank">
            <div class="post">
              <span class="position">${job.title}</span>
              <span class="company">${job.company}</span>
            </div>
            <div class="meta">
              <span class="location">
                <span class="city">${job.location}</span>
              </span>
              <span class="remote">Remote</span>
            </div>
          </a>
        `;

        const list = jobsContainer.querySelector('ul.jobs');
        if (list) list.appendChild(jobCard);
      });
    })
    .catch(error => {
      console.error('Error loading job listings:', error);
    });
});
</script>
