/**
 * JOBBYIST PLATFORM - BLACK & WHITE REDESIGN WITH ANIMATED GRAPHICS
 * 
 * Features implemented:
 * - Language selector with South African and Nigerian languages
 * - Floating chatbot with mock conversation
 * - Smooth scrolling and section animations
 * - Job search functionality
 * - Company carousel
 * - FAQ accordion
 * - Counter animations
 * - Mobile navigation
 */

class JobbyistApp {
  constructor() {
    console.log('🚀 Initializing Jobbyist Platform (Black & White Design)...');
    
    // Application state
    this.currentPage = 'homepage';
    this.currentLanguage = 'za-en';
    this.isMobileMenuOpen = false;
    this.chatbotOpen = false;
    
    // Data collections
    this.jobs = [];
    this.companies = [];
    this.currentCompanyIndex = 0;
    
    // Language translations
    this.translations = {
      'za-en': {
        'heroTitle': 'Find Your Dream Job in Africa',
        'heroSubtitle': 'Connect with top employers across Nigeria and South Africa. Discover opportunities in tech, finance, healthcare, and more on Africa\'s leading job platform.',
        'searchPlaceholder': 'Job title, keyword, or company',
        'featuresTitle': 'How Jobbyist Works',
        'featuresSubtitle': 'Get hired in 3 simple steps'
      },
      'za-af': {
        'heroTitle': 'Vind Jou Droomwerk in Afrika',
        'heroSubtitle': 'Verbind met top werkgewers regoor Nigerië en Suid-Afrika. Ontdek geleenthede in tegnologie, finansies, gesondheidsorg en meer.',
        'searchPlaceholder': 'Werktitel, sleutelwoord of maatskappy',
        'featuresTitle': 'Hoe Jobbyist Werk',
        'featuresSubtitle': 'Kry werk in 3 eenvoudige stappe'
      },
      'ng-en': {
        'heroTitle': 'Find Your Dream Job in Africa',
        'heroSubtitle': 'Connect with top employers across Nigeria and South Africa. Discover opportunities in tech, finance, healthcare, and more on Africa\'s leading job platform.',
        'searchPlaceholder': 'Job title, keyword, or company',
        'featuresTitle': 'How Jobbyist Works',
        'featuresSubtitle': 'Get hired in 3 simple steps'
      },
      'ng-yo': {
        'heroTitle': 'Wa Iṣẹ Ala Rẹ ni Afirika',
        'heroSubtitle': 'Darapọ mọ awọn olugbe pataki ni Naijiria ati South Africa. Ṣawari awọn anfani ni imọ-ẹrọ, owo, ilera ati diẹ sii.',
        'searchPlaceholder': 'Orukọ iṣẹ, koko-ọrọ tabi ile-iṣẹ',
        'featuresTitle': 'Bi Jobbyist Ṣe Nṣiṣẹ',
        'featuresSubtitle': 'Gba iṣẹ ni awọn igbesẹ mẹta rọrun'
      },
      'ng-ig': {
        'heroTitle': 'Chọta Ọrụ Nrọ Gị na Africa',
        'heroSubtitle': 'Jikọọ na ndị isi ọrụ kachasị na Nigeria na South Africa. Chọpụta ohere na teknụzụ, ego, ahụike na ndị ọzọ.',
        'searchPlaceholder': 'Aha ọrụ, okwu isi ma ọ bụ ụlọ ọrụ',
        'featuresTitle': 'Otú Jobbyist Si Arụ Ọrụ',
        'featuresSubtitle': 'Nweta ọrụ na nzọụkwụ 3 dị mfe'
      }
    };
    
    // Make globally available
    window.jobbyistApp = this;
  }

  async init() {
    console.log('🚀 Starting initialization...');
    
    try {
      // Load sample data
      this.loadSampleData();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Render homepage content
      this.renderHomepageContent();
      
      // Setup animations
      this.setupScrollAnimations();
      
      // Setup counters
      this.setupCounterAnimations();
      
      // Setup language selector
      this.setupLanguageSelector();
      
      // Setup chatbot
      this.setupChatbot();
      
      // Setup FAQ accordion
      this.setupFAQAccordion();
      
      // Setup company carousel
      this.setupCompanyCarousel();
      
      console.log('✅ Platform initialized successfully');
    } catch (error) {
      console.error('❌ Initialization error:', error);
    }
  }

  setupEventListeners() {
    console.log('🎯 Setting up event listeners...');

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    // Navigation dropdown clicks (for mobile)
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const menu = trigger.nextElementSibling;
          const isOpen = menu.style.display === 'block';
          
          // Close all dropdowns
          document.querySelectorAll('.dropdown-menu').forEach(m => {
            m.style.display = 'none';
          });
          
          // Toggle current dropdown
          if (!isOpen) {
            menu.style.display = 'block';
          }
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const navbar = document.getElementById('navbar-nav');
      const toggle = document.getElementById('mobile-menu-toggle');
      
      if (this.isMobileMenuOpen && 
          !navbar?.contains(e.target) && 
          !toggle?.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Hero search form
    const heroSearchForm = document.getElementById('hero-search-form');
    if (heroSearchForm) {
      heroSearchForm.addEventListener('submit', (e) => this.handleSearch(e));
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleFormSubmission(e, 'contact'));
    }

    // Pro trial button
    const proTrialBtn = document.getElementById('start-trial-btn');
    if (proTrialBtn) {
      proTrialBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.startProTrial();
      });
    }

    // Window resize handler
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    console.log('✅ Event listeners configured');
  }

  toggleMobileMenu() {
    const navbar = document.getElementById('navbar-nav');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    if (!navbar || !toggle) return;

    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isMobileMenuOpen) {
      navbar.classList.add('mobile-open');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      navbar.classList.remove('mobile-open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    console.log(`📱 Mobile menu ${this.isMobileMenuOpen ? 'opened' : 'closed'}`);
  }

  closeMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  setupLanguageSelector() {
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    if (!languageToggle || !languageDropdown) return;

    // Toggle dropdown
    languageToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      languageDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove('active');
      }
    });

    // Handle language selection
    languageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.getAttribute('data-lang');
        const flag = option.getAttribute('data-flag');
        const text = option.querySelector('span:last-child').textContent;
        
        this.changeLanguage(lang, flag, text);
        languageDropdown.classList.remove('active');
      });
    });

    console.log('🌐 Language selector configured');
  }

  changeLanguage(lang, flag, text) {
    this.currentLanguage = lang;
    
    // Update toggle button
    const flagIcon = document.querySelector('.flag-icon');
    const languageText = document.querySelector('.language-text');
    
    if (flagIcon) flagIcon.textContent = flag;
    if (languageText) languageText.textContent = text.split(' ')[0];
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page content
    this.updateTranslations();
    
    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jobbyist-language', lang);
    }
    
    console.log(`🌐 Language changed to: ${lang}`);
  }

  updateTranslations() {
    const translation = this.translations[this.currentLanguage] || this.translations['za-en'];
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const searchInput = document.getElementById('job-title');
    
    if (heroTitle) {
      heroTitle.innerHTML = translation.heroTitle.replace('Africa', '<span class="highlight-text">Africa</span>');
    }
    if (heroSubtitle) heroSubtitle.textContent = translation.heroSubtitle;
    if (searchInput) searchInput.placeholder = translation.searchPlaceholder;
    
    // Update features section
    const featuresTitle = document.querySelector('.features .section-title');
    const featuresSubtitle = document.querySelector('.features .section-subtitle');
    
    if (featuresTitle) featuresTitle.textContent = translation.featuresTitle;
    if (featuresSubtitle) featuresSubtitle.textContent = translation.featuresSubtitle;
  }

  setupChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-text-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (!chatbotToggle || !chatbotPanel) return;

    // Toggle chatbot
    chatbotToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleChatbot();
    });

    // Close chatbot
    if (chatbotClose) {
      chatbotClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeChatbot();
      });
    }

    // Handle message submission
    if (chatbotForm) {
      chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatbotInput.value.trim();
        if (message) {
          this.addChatMessage(message, 'user');
          chatbotInput.value = '';
          
          // Simulate bot response
          setTimeout(() => {
            this.addBotResponse(message);
          }, 1000);
        }
      });
    }

    console.log('💬 Chatbot configured');
  }

  toggleChatbot() {
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    
    this.chatbotOpen = !this.chatbotOpen;
    
    if (this.chatbotOpen) {
      chatbotPanel.classList.remove('hidden');
      chatbotToggle.style.transform = 'scale(0.9)';
    } else {
      chatbotPanel.classList.add('hidden');
      chatbotToggle.style.transform = 'scale(1)';
    }
  }

  closeChatbot() {
    if (this.chatbotOpen) {
      this.toggleChatbot();
    }
  }

  addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;

    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${sender}-message`;
    
    messageEl.innerHTML = `
      <div class="message-avatar">
        <i data-feather="${sender === 'user' ? 'user' : 'user'}"></i>
      </div>
      <div class="message-content">
        <p>${message}</p>
      </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Replace feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }

  addBotResponse(userMessage) {
    const responses = [
      "Thanks for your message! I'm here to help you find the perfect job opportunity.",
      "Great question! You can browse our job listings or create a profile to get personalized recommendations.",
      "I'd be happy to help! You can search for jobs by title, location, or company on our platform.",
      "That's interesting! Have you checked out our Pro features for enhanced job searching?",
      "I understand. Our platform connects talented professionals with top employers across Africa.",
      "Thanks for reaching out! You can also contact our support team for more detailed assistance."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    this.addChatMessage(randomResponse, 'bot');
  }

  setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (question && answer) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all FAQ items
          faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
          });
          
          // Toggle current item
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });

    console.log('❓ FAQ accordion configured');
  }

  setupCompanyCarousel() {
    const track = document.getElementById('companies-track');
    const prevBtn = document.getElementById('companies-prev');
    const nextBtn = document.getElementById('companies-next');
    
    if (!track || !prevBtn || !nextBtn) return;

    prevBtn.addEventListener('click', () => {
      this.currentCompanyIndex = Math.max(0, this.currentCompanyIndex - 1);
      this.updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      const maxIndex = Math.max(0, this.companies.length - 3);
      this.currentCompanyIndex = Math.min(maxIndex, this.currentCompanyIndex + 1);
      this.updateCarousel();
    });

    console.log('🎠 Company carousel configured');
  }

  updateCarousel() {
    const track = document.getElementById('companies-track');
    if (!track) return;

    const cardWidth = 320; // 300px + 20px gap
    const translateX = -this.currentCompanyIndex * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll(
      '.feature-card, .job-card, .category-card, .company-card, .testimonial-card'
    );
    
    animatedElements.forEach(el => {
      el.classList.add('fade-in-up');
      observer.observe(el);
    });

    console.log('🎬 Scroll animations configured');
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          if (current > target) current = target;
          
          if (target >= 1000) {
            counter.textContent = Math.floor(current / 1000) + 'K+';
          } else {
            counter.textContent = Math.floor(current) + (target === 89 ? '%' : '+');
          }
          
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    console.log('🔢 Counter animations configured');
  }

  loadSampleData() {
    this.jobs = [
      {
        id: 'job-001',
        title: 'Senior Software Engineer',
        company: 'TechSA Solutions',
        location: 'Johannesburg, South Africa',
        salary: 'R450K - R650K',
        type: 'Full-time',
        description: 'Join our dynamic team building innovative fintech solutions for the African market. Work with cutting-edge technologies and contribute to digital transformation.',
        datePosted: '2 days ago',
        featured: true
      },
      {
        id: 'job-002',
        title: 'Digital Marketing Manager',
        company: 'Lagos Digital Hub',
        location: 'Lagos, Nigeria',
        salary: '₦2.4M - ₦3.6M',
        type: 'Full-time',
        description: 'Lead digital marketing initiatives for growing tech startups across West Africa. Drive brand awareness and customer acquisition.',
        datePosted: '3 days ago',
        featured: true
      },
      {
        id: 'job-003',
        title: 'Data Analyst',
        company: 'Cape Analytics',
        location: 'Cape Town, South Africa',
        salary: 'R380K - R520K',
        type: 'Full-time',
        description: 'Transform data into actionable insights using advanced analytics tools and methodologies. Work with cross-functional teams.',
        datePosted: '1 week ago',
        featured: false
      },
      {
        id: 'job-004',
        title: 'Product Manager',
        company: 'Abuja Tech Solutions',
        location: 'Abuja, Nigeria',
        salary: '₦3M - ₦4.5M',
        type: 'Full-time',
        description: 'Drive product strategy and development for innovative mobile solutions serving the Nigerian market.',
        datePosted: '4 days ago',
        featured: true
      },
      {
        id: 'job-005',
        title: 'UI/UX Designer',
        company: 'Design Studio SA',
        location: 'Pretoria, South Africa',
        salary: 'R320K - R480K',
        type: 'Contract',
        description: 'Create intuitive user experiences for mobile and web applications serving African markets.',
        datePosted: '5 days ago',
        featured: false
      },
      {
        id: 'job-006',
        title: 'Business Development Manager',
        company: 'Pan African Ventures',
        location: 'Remote',
        salary: '$60K - $90K',
        type: 'Remote',
        description: 'Expand business operations across multiple African markets with strategic partnerships.',
        datePosted: '1 week ago',
        featured: true
      }
    ];

    this.companies = [
      {
        id: 'company-001',
        name: 'TechSA Solutions',
        logo: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=TS',
        industry: 'Technology',
        location: 'Johannesburg, South Africa',
        employees: '50-200',
        openJobs: 3,
        verified: true,
        description: 'Leading technology solutions provider transforming businesses across South Africa.'
      },
      {
        id: 'company-002',
        name: 'Lagos Digital Hub',
        logo: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=LDH',
        industry: 'Digital Marketing',
        location: 'Lagos, Nigeria',
        employees: '20-50',
        openJobs: 2,
        verified: true,
        description: 'Premier digital marketing agency serving clients across West Africa with innovative strategies.'
      },
      {
        id: 'company-003',
        name: 'Cape Analytics',
        logo: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=CA',
        industry: 'Data & Analytics',
        location: 'Cape Town, South Africa',
        employees: '10-50',
        openJobs: 1,
        verified: false,
        description: 'Data analytics consultancy helping businesses make informed, data-driven decisions.'
      },
      {
        id: 'company-004',
        name: 'Abuja Tech Solutions',
        logo: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=ATS',
        industry: 'Technology',
        location: 'Abuja, Nigeria',
        employees: '30-100',
        openJobs: 4,
        verified: true,
        description: 'Innovative technology company developing solutions for the Nigerian market.'
      },
      {
        id: 'company-005',
        name: 'Design Studio SA',
        logo: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=DS',
        industry: 'Design',
        location: 'Pretoria, South Africa',
        employees: '5-20',
        openJobs: 2,
        verified: false,
        description: 'Creative design studio specializing in user experience and brand identity.'
      }
    ];

    console.log('📊 Sample data loaded');
  }

  renderHomepageContent() {
    this.renderJobs();
    this.renderCompanies();
  }

  renderJobs() {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    const featuredJobs = this.jobs.filter(job => job.featured).slice(0, 6);
    
    container.innerHTML = featuredJobs.map(job => `
      <div class="job-card fade-in-up" data-job-id="${job.id}">
        <div class="job-header">
          <h3 class="job-title">${job.title}</h3>
          <div class="job-company">${job.company}</div>
        </div>
        <div class="job-meta">
          <span>📍 ${job.location}</span>
          <span>💰 ${job.salary}</span>
          <span>⏰ ${job.type}</span>
        </div>
        <div class="job-description">
          ${job.description.substring(0, 120)}...
        </div>
        <div class="job-tags">
          ${job.featured ? '<span class="job-tag">Featured</span>' : ''}
          <span class="job-tag">Posted ${job.datePosted}</span>
        </div>
        <button class="btn-primary" onclick="jobbyistApp.applyToJob('${job.id}')" style="margin-top: 16px; width: 100%;">
          <span>Apply Now</span>
          <i data-feather="arrow-right" class="btn-icon"></i>
        </button>
      </div>
    `).join('');

    // Replace feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }

    console.log('💼 Jobs rendered:', featuredJobs.length);
  }

  renderCompanies() {
    const track = document.getElementById('companies-track');
    if (!track) return;
    
    track.innerHTML = this.companies.map(company => `
      <div class="company-card" data-company-id="${company.id}">
        <div class="company-header">
          <div class="company-logo">
            <img src="${company.logo}" alt="${company.name} logo" />
          </div>
          <div class="company-info">
            <h3>
              ${company.name}
              ${company.verified ? '<span class="verified-badge">Verified</span>' : ''}
            </h3>
            <div class="company-meta">${company.industry} • ${company.location}</div>
          </div>
        </div>
        <div class="company-description">
          ${company.description}
        </div>
        <div class="company-stats">
          <span><strong>${company.employees}</strong> employees</span>
          <span><strong>${company.openJobs}</strong> open jobs</span>
        </div>
      </div>
    `).join('');

    console.log('🏢 Companies rendered:', this.companies.length);
  }

  handleSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchParams = {
      title: formData.get('title')?.toLowerCase() || '',
      type: formData.get('type') || '',
      location: formData.get('location') || ''
    };

    console.log('🔍 Search params:', searchParams);

    const filteredJobs = this.jobs.filter(job => {
      const matchesTitle = !searchParams.title || 
        job.title.toLowerCase().includes(searchParams.title) ||
        job.company.toLowerCase().includes(searchParams.title);
      
      const matchesType = !searchParams.type || job.type === searchParams.type;
      
      const matchesLocation = !searchParams.location || 
        job.location.includes(searchParams.location);

      return matchesTitle && matchesType && matchesLocation;
    });

    this.displaySearchResults(filteredJobs);
    this.scrollToResults();
    
    this.showNotification(`Found ${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} matching your search`);
  }

  displaySearchResults(jobs) {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    if (jobs.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <h3>No jobs found</h3>
          <p>Try adjusting your search criteria or browse all available positions</p>
        </div>
      `;
    } else {
      container.innerHTML = jobs.map(job => `
        <div class="job-card" data-job-id="${job.id}">
          <div class="job-header">
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">${job.company}</div>
          </div>
          <div class="job-meta">
            <span>📍 ${job.location}</span>
            <span>💰 ${job.salary}</span>
            <span>⏰ ${job.type}</span>
          </div>
          <div class="job-description">
            ${job.description.substring(0, 120)}...
          </div>
          <div class="job-tags">
            ${job.featured ? '<span class="job-tag">Featured</span>' : ''}
            <span class="job-tag">Posted ${job.datePosted}</span>
          </div>
          <button class="btn-primary" onclick="jobbyistApp.applyToJob('${job.id}')" style="margin-top: 16px; width: 100%;">
            <span>Apply Now</span>
            <i data-feather="arrow-right" class="btn-icon"></i>
          </button>
        </div>
      `).join('');

      // Replace feather icons
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
  }

  scrollToResults() {
    setTimeout(() => {
      const jobsSection = document.getElementById('job-listings');
      if (jobsSection) {
        jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  applyToJob(jobId) {
    const job = this.jobs.find(j => j.id === jobId);
    if (job) {
      this.showNotification(`Great choice! Application process for ${job.title} at ${job.company} - Feature coming soon!`);
      console.log('📝 Apply to job:', job.title);
    }
  }

  showPage(pageId) {
    console.log('📄 Navigating to page:', pageId);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      this.currentPage = pageId;
      this.closeMobileMenu();
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      console.log('✅ Page loaded:', pageId);
    } else {
      console.error('❌ Page not found:', pageId);
      this.showNotification(`Page "${pageId}" not found`, 'error');
    }
  }

  async handleFormSubmission(e, formType) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.querySelector('span')?.textContent;

    if (submitBtn && submitBtn.querySelector('span')) {
      submitBtn.querySelector('span').textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    try {
      const formData = new FormData(form);
      console.log(`📧 Submitting ${formType} form:`, Object.fromEntries(formData));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      form.reset();
      this.showNotification(`${this.capitalizeFirst(formType)} form submitted successfully!`);
      
    } catch (error) {
      console.error(`Error submitting ${formType} form:`, error);
      this.showNotification('Form submission failed. Please try again.', 'error');
    } finally {
      if (submitBtn && submitBtn.querySelector('span')) {
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  }

  startProTrial() {
    this.showNotification('Starting your free 3-day trial...');
    
    setTimeout(() => {
      this.showNotification('🎉 Pro trial activated! You now have access to all premium features for 3 days.');
    }, 2000);
    
    console.log('⭐ Pro trial started');
  }

  openRegistrationModal() {
    this.showNotification('Registration modal - Feature coming soon! Please use the contact form for now.');
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? '#f5f5f5' : '#ffffff'};
      color: ${type === 'error' ? '#000000' : '#000000'};
      border: 2px solid ${type === 'error' ? '#ff0000' : '#000000'};
      border-radius: 8px;
      padding: 16px 20px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 1100;
      max-width: 400px;
      transform: translateX(100%);
      transition: transform 250ms ease;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 18px; cursor: pointer; color: inherit; margin-left: 12px; font-weight: bold;">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) notification.remove();
        }, 300);
      }
    }, 5000);
  }
}

// Initialize the application
let jobbyistApp;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

async function initializeApp() {
  console.log('🚀 DOM ready, initializing Jobbyist Platform...');
  
  try {
    jobbyistApp = new JobbyistApp();
    window.jobbyistApp = jobbyistApp;
    
    await jobbyistApp.init();
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
    
    // Global error handling
    window.addEventListener('error', (e) => {
      console.error('Application error:', e.error);
      if (jobbyistApp && jobbyistApp.showNotification) {
        jobbyistApp.showNotification('An error occurred. Please refresh the page.', 'error');
      }
    });
    
    console.log('🎉 Jobbyist Platform ready with black & white design and animated graphics!');
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
  }
}
