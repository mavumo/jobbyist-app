/* Courses Coming-Soon Modal */

document.addEventListener('DOMContentLoaded', () => {
  const courseData = [
    { title: 'HTML & CSS Basics', desc: 'Build and style modern web pages from scratch.' },
    { title: 'Python for Data', desc: 'Analyze data & build scripts with Python.' },
    { title: 'Product Management 101', desc: 'Learn agile road-mapping & MVP design.' },
    { title: 'UX Foundations', desc: 'Research, wireframe, prototype user-centric designs.' },
    { title: 'Digital Marketing', desc: 'SEO, SEM, social media & analytics.' },
    { title: 'Interview Mastery', desc: 'Ace technical & behavioral interviews.' }
  ];

  const grid = document.querySelector('.courses-grid');
  const template = document.getElementById('course-card-template');
  const modal = document.getElementById('courses-modal');
  const courseNameEl = document.getElementById('modal-course-name');
  const hiddenCourseInput = document.getElementById('hidden-course-input');

  function openModal(course) {
    courseNameEl.textContent = `You selected: ${course.title}`;
    hiddenCourseInput.value = course.title;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  grid.innerHTML = '';
  courseData.forEach(c => {
    const card = template.content.cloneNode(true);
    card.querySelector('.course-title').textContent = c.title;
    card.querySelector('.course-desc').textContent = c.desc;
    card.querySelector('.preview-btn').addEventListener('click', () => openModal(c));
    grid.appendChild(card);
  });

  modal.querySelector('[data-close-modal]').addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
});
