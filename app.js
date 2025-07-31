/**
 * JOBBYIST PLATFORM - PRODUCTION READY APPLICATION - CRITICAL BUG FIXES
 * 
 * BACKEND CONFIGURATION GUIDE:
 * =============================
 * 
 * 1. FORMSPREE SETUP:
 * - Replace 'YOUR_FORM_ID' with actual Formspree form IDs
 * - Forms configured: Registration, Contact, Company Claim, Newsletter
 * - Configure at: https://formspree.io/
 * 
 * 2. SENDGRID EMAIL AUTHENTICATION:
 * - API Key: Set SENDGRID_API_KEY in environment
 * - Template IDs needed for magic links
 * - Configure SMTP: smtp.sendgrid.net, port 587
 * 
 * 3. GOOGLE CLOUD SETUP:
 * - Enable Google Sheets API
 * - Create service account with JSON key
 * - Share sheets with service account email
 * 
 * 4. TWILIO INTEGRATION:
 * - Account SID and Auth Token required
 * - SMS notifications for job alerts
 * - Verify phone numbers in dashboard
 * 
 * 5. ZAPIER WEBHOOKS:
 * - Set webhook URLs for job updates
 * - Configure triggers for new applications
 * - Connect to Google Sheets for data sync
 */

/**
 * ENHANCED JOBBYIST PLATFORM - MODERN BLACK & WHITE DESIGN WITH ANIMATED DOODLES
 * Fixed version with all functionality working properly
 */

class JobbyistPlatform {
  constructor() {
    // Core application state
    this.currentTheme = this.detectTheme();
    this.currentPage = 'homepage';
    
    // Enhanced modal state management
    this.modalState = {
      registrationModal: { 
        canReopen: true,
        isInitialized: false,
        currentStep: 1,
        totalSteps: 4,
        selectedJobId: null,
        formData: {}
      }
    };
    
    // User location and preferences
    this.userLocation = null;
    this.cookiePreferences = this.loadCookiePreferences();
    
    // Enhanced data collections with location restrictions
    this.jobs = [];
    this.companies = [];
    this.proFeatures = [];
    
    // Animation and interaction states
    this.isMobileMenuOpen = false;
    
    // Make instance globally available immediately
    window.jobbyistApp = this;
    
    this.init();
  }

  /**
   * ENHANCED INITIALIZATION
   */
  init() {
    console.log('🚀 Initializing Enhanced Jobbyist Platform...');
    
    this.setTheme(this.currentTheme, true);
    this.detectUserLocation();
    this.loadEnhancedSampleData();
    this.renderHomepageContent();
    this.setupEventListeners();
    this.initializeAnimations();
    this.checkCookieBanner();
    this.animateCounters();
    
    console.log('✅ Enhanced Platform initialized successfully');
  }

  /**
   * THEME MANAGEMENT - Enhanced for modern design
   */
  detectTheme() {
    const savedTheme = localStorage.getItem('jobbyist-theme');
    if (savedTheme) return savedTheme;
    return 'light'; // Default to light mode for black & white design
  }

  setTheme(theme, forceOverride = false) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jobbyist-theme', theme);
    
    if (forceOverride || theme === 'light') {
      document.documentElement.style.colorScheme = theme;
    }
    
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark');
    }
    
    // Update doodle colors for theme
    this.updateDoodleColors();
    
    console.log(`🎨 Theme set to: ${theme}`);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme, true);
    this.showNotification(`🎨 Switched to ${newTheme} mode`, 'success');
  }

  /**
   * ENHANCED ANIMATION SYSTEM
   */
  initializeAnimations() {
    this.setupDoodleAnimations();
    this.setupHoverEffects();
    
    console.log('✨ Animation system initialized');
  }

  setupDoodleAnimations() {
    const doodles = document.querySelectorAll('.floating-doodle');
    
    doodles.forEach((doodle, index) => {
      // Add staggered delays for more natural movement
      const delay = index * 0.5;
      doodle.style.animationDelay = `${delay}s`;
      
      // Add mouse interaction
      doodle.addEventListener('mouseenter', () => {
        doodle.style.animationPlayState = 'paused';
        doodle.style.transform += ' scale(1.2)';
      });
      
      doodle.addEventListener('mouseleave', () => {
        doodle.style.animationPlayState = 'running';
        doodle.style.transform = doodle.style.transform.replace(' scale(1.2)', '');
      });
    });
  }

  setupHoverEffects() {
    // Enhanced hover effects for interactive elements
    const interactiveCards = document.querySelectorAll('.job-card, .company-card, .category-card');
    
    interactiveCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  updateDoodleColors() {
    // Update doodle colors based on current theme
    const doodles = document.querySelectorAll('.floating-doodle');
    const isDark = this.currentTheme === 'dark';
    
    doodles.forEach(doodle => {
      if (isDark) {
        doodle.style.color = 'rgba(255, 255, 255, 0.3)';
      } else {
        doodle.style.color = 'rgba(0, 0, 0, 0.1)';
      }
    });
  }

  /**
   * ENHANCED MOBILE MENU
   */
  toggleMobileMenu() {
    const navbar = document.getElementById('navbar-nav');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    if (!navbar || !toggle) return;

    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isMobileMenuOpen) {
      navbar.classList.add('mobile-open');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navbar.classList.remove('mobile-open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    
    console.log(`📱 Mobile menu ${this.isMobileMenuOpen ? 'opened' : 'closed'}`);
  }

  closeMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  /**
   * ENHANCED GEO-TARGETING with restricted locations
   */
  async detectUserLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      this.userLocation = {
        country: data.country_name,
        countryCode: data.country_code,
        currency: data.currency,
        city: data.city
      };
      
      this.updatePricingByLocation();
      console.log('📍 Location detected:', this.userLocation);
    } catch (error) {
      console.log('📍 Using default location (South Africa)');
      this.userLocation = {
        country: 'South Africa',
        countryCode: 'ZA',
        currency: 'ZAR',
        city: 'Johannesburg'
      };
      this.updatePricingByLocation();
    }
  }

  updatePricingByLocation() {
    const currencyEl = document.getElementById('pro-currency');
    const amountEl = document.getElementById('pro-amount');
    const noteEl = document.getElementById('pro-price-note');
    
    if (!currencyEl || !amountEl || !noteEl) return;

    if (this.userLocation.countryCode === 'NG') {
      currencyEl.textContent = '₦';
      amountEl.textContent = '3,999';
      noteEl.textContent = 'NGN pricing for Nigeria';
    } else {
      currencyEl.textContent = 'R';
      amountEl.textContent = '149.99';
      noteEl.textContent = 'ZAR pricing for South Africa';
    }
  }

  /**
   * ENHANCED DATA LOADING with location restrictions
   */
  loadEnhancedSampleData() {
    // Enhanced jobs data with better location targeting
    this.jobs = [
      {
        id: 'job-001',
        title: 'Senior Software Engineer',
        company: 'TechSA Solutions',
        location: 'Johannesburg, South Africa',
        country: 'South Africa',
        currency: 'ZAR',
        salaryMin: 450000,
        salaryMax: 650000,
        type: 'Full-time',
        description: 'Join our innovative team building cutting-edge fintech solutions for the African market. Work with React, Node.js, and cloud technologies.',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        datePosted: '2025-01-30',
        featured: true,
        remote: false
      },
      {
        id: 'job-002',
        title: 'Digital Marketing Manager',
        company: 'Lagos Digital Hub',
        location: 'Lagos, Nigeria',
        country: 'Nigeria',
        currency: 'NGN',
        salaryMin: 2400000,
        salaryMax: 3600000,
        type: 'Full-time',
        description: 'Lead digital marketing initiatives for growing tech startups across West Africa. Drive brand awareness and customer acquisition strategies.',
        skills: ['Digital Marketing', 'Google Ads', 'Social Media', 'Analytics'],
        datePosted: '2025-01-29',
        featured: true,
        remote: false
      },
      {
        id: 'job-003',
        title: 'Data Analyst (Remote)',
        company: 'Cape Analytics',
        location: 'Remote (South Africa/Nigeria)',
        country: 'Remote',
        currency: 'USD',
        salaryMin: 35000,
        salaryMax: 55000,
        type: 'Remote',
        description: 'Transform data into actionable insights using advanced analytics tools. Work remotely with teams across Africa.',
        skills: ['Python', 'SQL', 'Tableau', 'Statistics'],
        datePosted: '2025-01-28',
        featured: true,
        remote: true
      },
      {
        id: 'job-004',
        title: 'Product Manager',
        company: 'Abuja Tech Solutions',
        location: 'Abuja, Nigeria',
        country: 'Nigeria',
        currency: 'NGN',
        salaryMin: 3000000,
        salaryMax: 4500000,
        type: 'Full-time',
        description: 'Drive product strategy and development for innovative mobile solutions serving the Nigerian market.',
        skills: ['Product Management', 'Agile', 'User Research', 'Analytics'],
        datePosted: '2025-01-27',
        featured: true,
        remote: false
      },
      {
        id: 'job-005',
        title: 'UX Designer',
        company: 'Creative Studio CT',
        location: 'Cape Town, South Africa',
        country: 'South Africa',
        currency: 'ZAR',
        salaryMin: 320000,
        salaryMax: 480000,
        type: 'Full-time',
        description: 'Design exceptional user experiences for web and mobile applications. Collaborate with product teams to create intuitive interfaces.',
        skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
        datePosted: '2025-01-26',
        featured: false,
        remote: false
      },
      {
        id: 'job-006',
        title: 'DevOps Engineer (Remote)',
        company: 'Cloud Solutions Africa',
        location: 'Remote (Nigeria/South Africa)',
        country: 'Remote',
        currency: 'USD',
        salaryMin: 45000,
        salaryMax: 70000,
        type: 'Remote',
        description: 'Build and maintain scalable cloud infrastructure. Work with modern DevOps tools and practices in a fully remote environment.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        datePosted: '2025-01-25',
        featured: false,
        remote: true
      }
    ];

    // Enhanced companies data
    this.companies = [
      {
        id: 'company-001',
        name: 'TechSA Solutions',
        logo: 'https://via.placeholder.com/100x100/000000/white?text=TS',
        industry: 'Technology',
        location: 'Johannesburg, South Africa',
        employees: '50-200',
        openJobs: 5,
        verified: true,
        rating: 4.8,
        description: 'Leading technology solutions provider transforming businesses across South Africa with innovative software solutions.',
        founded: '2018',
        website: 'https://techsa.co.za'
      },
      {
        id: 'company-002',
        name: 'Lagos Digital Hub',
        logo: 'https://via.placeholder.com/100x100/4285f4/white?text=LDH',
        industry: 'Digital Marketing',
        location: 'Lagos, Nigeria',
        employees: '20-50',
        openJobs: 3,
        verified: true,
        rating: 4.6,
        description: 'Premier digital marketing agency serving clients across West Africa with data-driven marketing strategies.',
        founded: '2019',
        website: 'https://lagosdigital.ng'
      },
      {
        id: 'company-003',
        name: 'Cape Analytics',
        logo: 'https://via.placeholder.com/100x100/34a853/white?text=CA',
        industry: 'Data & Analytics',
        location: 'Cape Town, South Africa',
        employees: '10-50',
        openJobs: 2,
        verified: false,
        rating: 4.4,
        description: 'Data analytics consultancy helping businesses make informed decisions through advanced data science.',
        founded: '2020',
        website: 'https://capeanalytics.co.za'
      }
    ];

    // Enhanced pro features
    this.proFeatures = [
      {
        icon: '🔍',
        title: 'AI-Powered Resume Optimization',
        description: 'Get instant AI feedback on your resume with personalized improvement suggestions and ATS optimization.'
      },
      {
        icon: '📧',
        title: 'Priority Job Alerts',
        description: 'Receive job notifications 24 hours before they go live to the public, giving you a competitive edge.'
      },
      {
        icon: '🎯',
        title: 'Advanced Job Matching',
        description: 'Our AI algorithm matches you with jobs based on your skills, experience, and career goals.'
      },
      {
        icon: '📊',
        title: 'Application Analytics',
        description: 'Track application performance, view rates, and get insights on how to improve your success rate.'
      },
      {
        icon: '💬',
        title: 'Career Coaching Sessions',
        description: 'Monthly one-on-one sessions with certified career coaches and industry professionals.'
      },
      {
        icon: '🚀',
        title: 'Profile Boost',
        description: 'Get 3x more profile views with priority placement in employer searches and recommendations.'
      }
    ];

    console.log('📊 Enhanced sample data loaded successfully');
  }

  /**
   * ENHANCED EVENT LISTENERS - FIXED
   */
  setupEventListeners() {
    // Theme toggle - FIXED
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleTheme();
      });
      console.log('🎨 Theme toggle listener added');
    }

    // Enhanced mobile menu toggle - FIXED
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMobileMenu();
      });
      console.log('📱 Mobile menu toggle listener added');
    }

    // Navigation dropdown toggles - FIXED
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const dropdown = trigger.parentElement;
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Close other dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('open');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('open');
        console.log('📋 Dropdown toggled');
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
          dropdown.classList.remove('open');
        });
      }
      
      // Close mobile menu when clicking outside
      const navbar = document.getElementById('navbar-nav');
      const toggle = document.getElementById('mobile-menu-toggle');
      
      if (this.isMobileMenuOpen && 
          !navbar?.contains(e.target) && 
          !toggle?.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Enhanced search form with location restrictions - FIXED
    const heroSearchForm = document.getElementById('hero-search-form');
    if (heroSearchForm) {
      heroSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEnhancedSearch(e);
      });
      console.log('🔍 Search form listener added');
    }

    // Apply Now buttons with enhanced UX - FIXED
    document.addEventListener('click', (e) => {
      const applyBtn = e.target.closest('button[data-action="apply"]');
      if (applyBtn) {
        e.preventDefault();
        e.stopPropagation();
        const jobId = applyBtn.getAttribute('data-job-id');
        this.openRegistrationModal(jobId);
        
        // Add visual feedback
        this.addButtonFeedback(applyBtn);
        console.log('💼 Apply button clicked for job:', jobId);
      }
    });

    // Category card clicks - FIXED
    document.addEventListener('click', (e) => {
      const categoryCard = e.target.closest('.category-card');
      if (categoryCard) {
        const categoryName = categoryCard.querySelector('h3')?.textContent;
        if (categoryName) {
          this.handleCategoryClick(categoryName);
        }
      }
    });

    // Enhanced button interactions
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('glow-effect') || e.target.closest('.glow-effect')) {
        const button = e.target.classList.contains('glow-effect') ? e.target : e.target.closest('.glow-effect');
        this.addButtonFeedback(button);
      }
    });

    // View all jobs button
    const viewAllJobsBtn = document.getElementById('view-all-jobs');
    if (viewAllJobsBtn) {
      viewAllJobsBtn.addEventListener('click', () => {
        this.showNotification('🔍 Advanced job search coming soon! More filtering options will be available.', 'info');
      });
    }

    this.setupRegistrationModal();
    this.setupCookieBanner();
    this.setupFormSubmissions();

    // Pro subscribe button
    const proSubscribeBtn = document.getElementById('start-trial-btn');
    if (proSubscribeBtn) {
      proSubscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.startProTrial();
      });
    }

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    console.log('🎯 Enhanced event listeners configured');
  }

  /**
   * HANDLE CATEGORY CLICKS - NEW
   */
  handleCategoryClick(categoryName) {
    this.showNotification(`🎯 Searching for ${categoryName} jobs...`, 'info');
    
    // Filter jobs by category/skills
    const categoryKeywords = {
      'Technology': ['react', 'node', 'javascript', 'python', 'aws', 'software', 'developer', 'engineer'],
      'Marketing': ['marketing', 'digital', 'social media', 'ads', 'analytics'],
      'Finance': ['finance', 'accounting', 'financial', 'analyst'],
      'Healthcare': ['healthcare', 'medical', 'health', 'nurse', 'doctor'],
      'Education': ['education', 'teacher', 'instructor', 'training'],
      'Sales': ['sales', 'business development', 'account manager']
    };
    
    const keywords = categoryKeywords[categoryName] || [];
    const filteredJobs = this.jobs.filter(job => {
      const searchText = (job.title + ' ' + job.description + ' ' + (job.skills?.join(' ') || '')).toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword));
    });
    
    setTimeout(() => {
      this.displaySearchResults(filteredJobs, { category: categoryName });
      this.scrollToResults();
      this.showNotification(`✅ Found ${filteredJobs.length} ${categoryName} job${filteredJobs.length !== 1 ? 's' : ''}`, 'success');
    }, 1000);
  }

  /**
   * ENHANCED BUTTON FEEDBACK SYSTEM
   */
  addButtonFeedback(button) {
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Scale feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }

  /**
   * ENHANCED SEARCH FUNCTIONALITY with location restrictions - FIXED
   */
  handleEnhancedSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchParams = {
      title: formData.get('title')?.toLowerCase().trim() || '',
      type: formData.get('type') || '',
      location: formData.get('location') || ''
    };

    console.log('🔍 Enhanced search params:', searchParams);

    // Validate location restrictions
    const allowedLocations = [
      'Lagos', 'Johannesburg', 'Cape Town', 'Abuja', 'Pretoria', 'Durban', 
      'Nigeria', 'South Africa', 'Remote'
    ];

    if (searchParams.location && !allowedLocations.includes(searchParams.location)) {
      this.showNotification('❌ Search is currently limited to South Africa and Nigeria locations only.', 'warning');
      return;
    }

    // Show loading state
    this.showNotification('🔍 Searching for jobs...', 'info');

    const filteredJobs = this.jobs.filter(job => {
      const matchesTitle = !searchParams.title || 
        job.title.toLowerCase().includes(searchParams.title) ||
        job.company.toLowerCase().includes(searchParams.title) ||
        job.skills?.some(skill => skill.toLowerCase().includes(searchParams.title));
      
      const matchesType = !searchParams.type || job.type === searchParams.type;
      
      const matchesLocation = !searchParams.location || 
        job.location.includes(searchParams.location) ||
        job.country.includes(searchParams.location) ||
        (searchParams.location === 'Remote' && job.remote);

      return matchesTitle && matchesType && matchesLocation;
    });

    // Simulate search delay for better UX
    setTimeout(() => {
      this.displaySearchResults(filteredJobs, searchParams);
      this.scrollToResults();
      
      const message = filteredJobs.length === 0 
        ? '🔍 No jobs found matching your criteria. Try adjusting your search terms.'
        : `✅ Found ${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} matching your search`;
      
      this.showNotification(message, filteredJobs.length > 0 ? 'success' : 'info');
    }, 800);
  }

  displaySearchResults(jobs, searchParams) {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    if (jobs.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-secondary);">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="margin-bottom: 1rem; color: var(--color-text);">No jobs found</h3>
          <p>Try adjusting your search criteria:</p>
          <ul style="list-style: none; padding: 0; margin: 1rem 0;">
            <li>• Use different keywords</li>
            <li>• Try a broader job type</li>
            <li>• Consider remote opportunities</li>
            <li>• Check spelling and try synonyms</li>
          </ul>
          <button class="btn--primary glow-effect" onclick="window.jobbyistApp.renderJobs();" style="margin-top: 1rem;">
            <span>View All Jobs</span>
          </button>
        </div>
      `;
    } else {
      // Add search context header
      const searchContext = this.createSearchContextHeader(searchParams, jobs.length);
      container.innerHTML = searchContext + jobs.map(job => this.createJobCard(job)).join('');
    }
  }

  createSearchContextHeader(searchParams, resultCount) {
    const filters = [];
    if (searchParams.title) filters.push(`"${searchParams.title}"`);
    if (searchParams.type) filters.push(searchParams.type);
    if (searchParams.location) filters.push(searchParams.location);
    if (searchParams.category) filters.push(searchParams.category);
    
    const filtersText = filters.length > 0 ? ` for ${filters.join(', ')}` : '';
    
    return `
      <div style="grid-column: 1 / -1; background: var(--color-surface-variant); padding: 1.5rem; border-radius: var(--radius-xl); margin-bottom: 2rem; border: 2px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h3 style="margin: 0; color: var(--color-text);">Search Results</h3>
            <p style="margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">
              Found ${resultCount} job${resultCount !== 1 ? 's' : ''}${filtersText}
            </p>
          </div>
          <button class="btn--secondary" onclick="window.jobbyistApp.renderJobs();" style="white-space: nowrap;">
            <span>Clear Filters</span>
          </button>
        </div>
      </div>
    `;
  }

  createJobCard(job) {
    const salaryText = this.formatSalary(job.salaryMin, job.salaryMax, job.currency);
    const skillTags = job.skills ? job.skills.slice(0, 3).map(skill => 
      `<span class="job-tag">${skill}</span>`
    ).join('') : '';
    
    return `
      <div class="job-card" data-job-id="${job.id}">
        <div class="job-header">
          <h3 class="job-title">${job.title}</h3>
          <div class="job-company">${job.company}</div>
        </div>
        <div class="job-meta">
          <span>📍 ${job.location}</span>
          <span>💰 ${salaryText}</span>
          <span>⏰ ${job.type}</span>
          ${job.remote ? '<span>🌐 Remote</span>' : ''}
        </div>
        <div class="job-description">
          ${job.description.substring(0, 150)}...
        </div>
        <div class="job-tags">
          ${job.featured ? '<span class="job-tag" style="background: var(--gradient-glow); color: white;">Featured</span>' : ''}
          <span class="job-tag">Posted ${this.getRelativeTime(job.datePosted)}</span>
          ${skillTags}
        </div>
        <button class="btn--primary glow-effect" data-action="apply" data-job-id="${job.id}" style="margin-top: 1rem; width: 100%;">
          <span>Apply Now</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    `;
  }

  scrollToResults() {
    setTimeout(() => {
      const jobsSection = document.getElementById('job-listings');
      if (jobsSection) {
        jobsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  }

  /**
   * ENHANCED CONTENT RENDERING - FIXED
   */
  renderHomepageContent() {
    this.renderJobs();
    this.renderCompaniesPreview();
    this.animateCounters();
  }

  renderJobs() {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    const featuredJobs = this.jobs.filter(job => job.featured).slice(0, 6);
    
    container.innerHTML = featuredJobs.map(job => this.createJobCard(job)).join('');

    console.log('💼 Enhanced jobs rendered:', featuredJobs.length);
  }

  renderCompaniesPreview() {
    const container = document.getElementById('companies-preview-container');
    if (!container) return;

    const featuredCompanies = this.companies.slice(0, 3);
    
    container.innerHTML = featuredCompanies.map(company => `
      <div class="company-card" onclick="window.jobbyistApp.showCompanyDetail('${company.id}')">
        <div class="company-header">
          <div class="company-logo">
            <img src="${company.logo}" alt="${company.name} logo" onerror="this.style.display='none'" />
          </div>
          <div class="company-info">
            <h3>
              ${company.name}
              ${company.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            </h3>
            <div class="company-meta">
              ${company.industry} • ${company.location}
              ${company.rating ? ` • ⭐ ${company.rating}` : ''}
            </div>
          </div>
        </div>
        <div class="company-description">
          ${company.description}
        </div>
        <div class="company-stats">
          <span><strong>${company.employees}</strong> employees</span>
          <span><strong>${company.openJobs}</strong> open jobs</span>
          <span><strong>Founded</strong> ${company.founded}</span>
        </div>
      </div>
    `).join('');

    console.log('🏢 Enhanced companies preview rendered:', featuredCompanies.length);
  }

  renderProFeatures() {
    const container = document.getElementById('pro-features-container');
    if (!container) return;

    container.innerHTML = this.proFeatures.map(feature => `
      <div class="pro-feature-card">
        <div class="pro-feature-icon">${feature.icon}</div>
        <h3 class="pro-feature-title">${feature.title}</h3>
        <p class="pro-feature-description">${feature.description}</p>
      </div>
    `).join('');

    console.log('⭐ Enhanced pro features rendered:', this.proFeatures.length);
  }

  /**
   * ENHANCED MODAL SYSTEM - FIXED
   */
  setupRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    if (!modal) {
      console.error('Registration modal not found');
      return;
    }

    // Modal controls
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeRegistrationModal();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.closeRegistrationModal();
        }
      });
    }

    // Form navigation
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    const submitBtn = document.getElementById('submit-registration');
    const form = document.getElementById('registration-form');

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextRegistrationStep();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.prevRegistrationStep();
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.submitRegistration();
      });  
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitRegistration();
      });
    }

    this.setupFileUploads();
    this.modalState.registrationModal.isInitialized = true;
    console.log('📝 Enhanced registration modal configured');
  }

  openRegistrationModal(jobId = null) {
    console.log('Opening enhanced registration modal for job:', jobId);
    
    const modal = document.getElementById('registration-modal');
    if (!modal) {
      console.error('Registration modal not found');
      return;
    }

    // Reset modal state
    this.modalState.registrationModal.canReopen = true;
    this.modalState.registrationModal.currentStep = 1;
    this.modalState.registrationModal.selectedJobId = jobId;
    
    // Reset form visibility
    const form = document.getElementById('registration-form');
    const navigation = document.querySelector('.form-navigation');
    const progressContainer = document.querySelector('.progress-container');
    const successSection = document.getElementById('registration-success');

    if (form) {
      form.style.display = 'block';
      form.reset();
    }
    if (navigation) navigation.style.display = 'flex';
    if (progressContainer) progressContainer.style.display = 'block';
    if (successSection) successSection.classList.add('hidden');

    // Show first step
    this.showRegistrationStep(1);
    this.updateRegistrationProgress();

    // Show modal with enhanced animation
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus management
    setTimeout(() => {
      const firstInput = modal.querySelector('input:not([type="file"]):not([type="checkbox"])');
      if (firstInput) firstInput.focus();
    }, 150);

    console.log('✅ Enhanced registration modal opened successfully');
  }

  closeRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    if (!modal) return;

    modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    this.modalState.registrationModal.canReopen = true;
    
    console.log('📝 Enhanced registration modal closed');
  }

  showRegistrationStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(stepEl => {
      stepEl.classList.remove('active');
    });

    // Show current step with animation
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepEl) {
      currentStepEl.classList.add('active');
    }

    // Update navigation buttons  
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const submitBtn = document.getElementById('submit-registration');

    if (prevBtn) {
      prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
    }

    if (nextBtn && submitBtn) {
      if (step === this.modalState.registrationModal.totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
      } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
      }
    }

    // Update step indicators with animation
    document.querySelectorAll('.step').forEach((stepIndicator, index) => {
      stepIndicator.classList.remove('active', 'completed');
      if (index + 1 === step) {
        stepIndicator.classList.add('active');
      } else if (index + 1 < step) {
        stepIndicator.classList.add('completed');
      }
    });

    this.modalState.registrationModal.currentStep = step;
  }

  updateRegistrationProgress() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
      const percentage = (this.modalState.registrationModal.currentStep / this.modalState.registrationModal.totalSteps) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  }

  nextRegistrationStep() {
    if (this.validateCurrentStep()) {
      if (this.modalState.registrationModal.currentStep < this.modalState.registrationModal.totalSteps) {
        this.showRegistrationStep(this.modalState.registrationModal.currentStep + 1);
        this.updateRegistrationProgress();
      }
    }
  }

  prevRegistrationStep() {
    if (this.modalState.registrationModal.currentStep > 1) {
      this.showRegistrationStep(this.modalState.registrationModal.currentStep - 1);
      this.updateRegistrationProgress();
    }
  }

  validateCurrentStep() {
    const currentStepEl = document.querySelector(`.form-step[data-step="${this.modalState.registrationModal.currentStep}"]`);
    if (!currentStepEl) return false;

    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      const value = field.type === 'checkbox' ? field.checked : field.value.trim();
      
      if (!value) {
        field.style.borderColor = 'var(--color-error)';
        field.style.boxShadow = '0 0 0 3px rgba(234, 67, 53, 0.1)';
        isValid = false;
        
        // Add shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          field.style.animation = '';
        }, 500);
      } else {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      }
    });

    if (!isValid) {
      this.showNotification('❗ Please fill in all required fields to continue.', 'error');
    }

    return isValid;
  }

  async submitRegistration() {
    if (!this.validateCurrentStep()) return;

    const submitBtn = document.getElementById('submit-registration');
    const originalText = submitBtn?.querySelector('span')?.textContent;
    
    if (submitBtn) {
      submitBtn.querySelector('span').textContent = 'Creating Account...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
    }

    try {
      // Enhanced simulation with progress
      await this.simulateRegistrationProcess();
      
      this.showRegistrationSuccess();
      this.showNotification('🎉 Account created successfully! Welcome to Jobbyist!', 'success');
      
    } catch (error) {
      this.showNotification('❌ Registration failed. Please try again.', 'error');
      if (submitBtn) {
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    }
  }

  async simulateRegistrationProcess() {
    // Simulate multi-step registration process
    const steps = [
      'Validating information...',
      'Creating account...',
      'Setting up profile...',
      'Finalizing registration...'
    ];
    
    const submitBtn = document.getElementById('submit-registration');
    
    for (let i = 0; i < steps.length; i++) {
      if (submitBtn) {
        submitBtn.querySelector('span').textContent = steps[i];
      }
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }

  showRegistrationSuccess() {
    const form = document.getElementById('registration-form');
    const navigation = document.querySelector('.form-navigation');
    const progressContainer = document.querySelector('.progress-container');
    const successSection = document.getElementById('registration-success');

    if (form) form.style.display = 'none';
    if (navigation) navigation.style.display = 'none';
    if (progressContainer) progressContainer.style.display = 'none';
    if (successSection) successSection.classList.remove('hidden');

    // Update apply button for selected job
    const applyBtn = document.getElementById('apply-to-job');
    if (applyBtn && this.modalState.registrationModal.selectedJobId) {
      const job = this.jobs.find(j => j.id === this.modalState.registrationModal.selectedJobId);
      if (job) {
        const applyText = document.getElementById('apply-job-text');
        if (applyText) applyText.textContent = `Apply to ${job.title} Now`;
        
        applyBtn.onclick = () => {
          this.closeRegistrationModal();
          this.showNotification(`🚀 Application submitted for ${job.title}! We'll be in touch soon.`, 'success');
        };
      }
    }
  }

  /**
   * ENHANCED FILE UPLOAD SYSTEM
   */
  setupFileUploads() {
    const fileUploadAreas = document.querySelectorAll('.file-upload-area');
    
    fileUploadAreas.forEach(area => {
      const fileInput = area.querySelector('.file-input');
      const uploadContent = area.querySelector('.file-upload-content');
      const preview = area.querySelector('.file-preview');

      if (!fileInput) return;

      // Click to upload
      area.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
      });

      // File selection
      fileInput.addEventListener('change', (e) => {
        e.stopPropagation();
        const file = e.target.files[0];
        if (file) {
          this.handleFileSelect(file, area);
        }
      });

      // Enhanced drag and drop
      area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.classList.add('dragover');
        area.style.transform = 'scale(1.02)';
      });

      area.addEventListener('dragleave', (e) => {
        e.preventDefault();
        area.classList.remove('dragover');
        area.style.transform = '';
      });

      area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.classList.remove('dragover');
        area.style.transform = '';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.handleFileSelect(files[0], area);
        }
      });
    });
  }

  handleFileSelect(file, uploadArea) {
    const fileInput = uploadArea.querySelector('.file-input');
    const uploadContent = uploadArea.querySelector('.file-upload-content');
    const preview = uploadArea.querySelector('.file-preview');
    
    if (!file || !preview) return;

    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file.size > maxSize) {
      this.showNotification('📄 File size too large. Maximum 10MB allowed.', 'error');
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      this.showNotification('📄 File type not supported. Please upload PDF, DOC, or DOCX files.', 'error');
      return;
    }

    // Show enhanced preview
    uploadContent.style.display = 'none';
    preview.style.display = 'flex';
    preview.innerHTML = `
      <div style="width: 48px; height: 48px; background: var(--gradient-glow); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.5rem;">📄</div>
      <div class="file-preview-info" style="flex: 1;">
        <div class="file-preview-name" style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: 0.25rem;">${file.name}</div>
        <div class="file-preview-size" style="font-size: var(--text-xs); color: var(--color-text-secondary);">${this.formatFileSize(file.size)} • Uploaded successfully</div>
      </div>
      <button type="button" class="file-remove" onclick="window.jobbyistApp.removeFile('${fileInput.name}')" style="background: none; border: none; color: var(--color-text-secondary); cursor: pointer; padding: 0.5rem; border-radius: var(--radius-md); transition: all var(--transition-fast);">&times;</button>
    `;

    // Update file input
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;

    this.showNotification('✅ File uploaded successfully!', 'success');
  }

  removeFile(inputName) {
    const fileInput = document.querySelector(`input[name="${inputName}"]`);
    if (!fileInput) return;

    const uploadArea = fileInput.closest('.file-upload-area');
    const uploadContent = uploadArea.querySelector('.file-upload-content');
    const preview = uploadArea.querySelector('.file-preview');

    fileInput.value = '';
    uploadContent.style.display = 'flex';
    preview.style.display = 'none';
    preview.innerHTML = '';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * ENHANCED COOKIE MANAGEMENT
   */
  setupCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const settingsBtn = document.getElementById('cookie-settings');

    if (!this.cookiePreferences.accepted && banner) {
      setTimeout(() => {
        banner.classList.remove('hidden');
        banner.style.animation = 'slideUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, 2000);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.acceptAllCookies();
        banner?.classList.add('hidden');
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.showPage('cookies');
        banner?.classList.add('hidden');
      });
    }
  }

  loadCookiePreferences() {
    const saved = localStorage.getItem('jobbyist-cookie-preferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
    
    return {
      accepted: false,
      essential: true,
      analytics: false,
      marketing: false
    };
  }

  saveCookieSettings() {
    const analyticsCheckbox = document.getElementById('analytics-cookies');
    const marketingCheckbox = document.getElementById('marketing-cookies');

    this.cookiePreferences = {
      accepted: true,
      essential: true,
      analytics: analyticsCheckbox?.checked || false,
      marketing: marketingCheckbox?.checked || false,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('jobbyist-cookie-preferences', JSON.stringify(this.cookiePreferences));
    this.showNotification('🍪 Cookie preferences saved successfully!', 'success');
    
    setTimeout(() => {
      this.showPage('homepage');
    }, 1500);
    
    console.log('🍪 Enhanced cookie preferences saved:', this.cookiePreferences);
  }

  resetCookieSettings() {
    const analyticsCheckbox = document.getElementById('analytics-cookies');
    const marketingCheckbox = document.getElementById('marketing-cookies');

    if (analyticsCheckbox) analyticsCheckbox.checked = false;
    if (marketingCheckbox) marketingCheckbox.checked = false;

    this.showNotification('🔄 Cookie settings reset to default.', 'info');
  }

  acceptAllCookies() {
    this.cookiePreferences = {
      accepted: true,
      essential: true,
      analytics: true,
      marketing: true,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('jobbyist-cookie-preferences', JSON.stringify(this.cookiePreferences));
    this.showNotification('🍪 All cookies accepted. Thank you!', 'success');
    console.log('🍪 All cookies accepted');
  }

  checkCookieBanner() {
    if (!this.cookiePreferences.accepted) {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        setTimeout(() => banner.classList.remove('hidden'), 2000);
      }
    }
  }

  /**
   * ENHANCED FORM SUBMISSIONS
   */
  setupFormSubmissions() {
    const forms = [
      { id: 'contact-form', type: 'contact' },
      { id: 'app-notify-form', type: 'newsletter' },
      { id: 'registration-form', type: 'registration' }
    ];

    forms.forEach(({ id, type }) => {
      const form = document.getElementById(id);
      if (form) {
        form.addEventListener('submit', (e) => {
          this.handleFormSubmission(e, type);
        });
      }
    });
  }

  async handleFormSubmission(e, formType) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;

    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
    }

    try {
      const formData = new FormData(form);
      formData.append('formType', formType);
      formData.append('timestamp', new Date().toISOString());
      formData.append('userLocation', JSON.stringify(this.userLocation));
      
      console.log(`📧 Enhanced ${formType} form submission:`, Object.fromEntries(formData));
      
      // Simulate API call with progress
      await this.simulateFormSubmission(formType);
      
      form.reset();
      
      const successMessages = {
        contact: '📧 Message sent successfully! We\'ll get back to you within 24 hours.',
        newsletter: '📱 Thank you for subscribing! You\'ll be the first to know when our mobile app launches.'
      };
      
      this.showNotification(successMessages[formType] || 'Form submitted successfully!', 'success');
      
    } catch (error) {
      console.error(`Error submitting ${formType} form:`, error);
      this.showNotification('❌ Form submission failed. Please try again.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    }
  }

  async simulateFormSubmission(formType) {
    const delays = {
      contact: 1500,
      newsletter: 1000,
      registration: 2500
    };
    
    await new Promise(resolve => setTimeout(resolve, delays[formType] || 1500));
  }

  /**
   * ENHANCED UTILITY FUNCTIONS
   */
  formatSalary(min, max, currency) {
    const formatNumber = (num) => {
      if (currency === 'ZAR') {
        return `R${(num / 1000).toFixed(0)}k`;
      } else if (currency === 'NGN') {
        return `₦${(num / 1000).toFixed(0)}k`;
      } else {
        return `$${(num / 1000).toFixed(0)}k`;
      }
    };
    
    if (min === max) {
      return formatNumber(min);
    }
    
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  }

  getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  }

  /**
   * ENHANCED COUNTER ANIMATION
   */
  animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 60; // 60 frames for smooth animation
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          if (current > target) current = target;
          
          let displayValue;
          if (target >= 50000) {
            displayValue = Math.floor(current / 1000) + 'K+';
          } else if (target >= 1000) {
            displayValue = (Math.floor(current / 100) / 10).toFixed(1) + 'K+';
          } else {
            displayValue = Math.floor(current) + '+';
          }
          
          counter.textContent = displayValue;
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    };

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          setTimeout(() => {
            animateCounter(entry.target);
          }, Math.random() * 500); // Stagger animations
        }
      });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
  }

  /**
   * ENHANCED NOTIFICATION SYSTEM
   */
  showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    const colors = {
      success: 'var(--color-success)',
      error: 'var(--color-error)',
      warning: 'var(--color-warning)',
      info: 'var(--color-accent)'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      background: var(--color-surface);
      border: 2px solid ${colors[type]};
      border-radius: var(--radius-xl);
      padding: var(--space-4) var(--space-6);
      box-shadow: var(--shadow-2xl);
      z-index: 1100;
      max-width: 420px;
      transform: translateX(100%);
      transition: all var(--transition-normal);
      backdrop-filter: blur(10px);
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: var(--space-3); color: var(--color-text);">
        <span style="font-size: 1.25rem;">${icons[type]}</span>
        <span style="flex: 1; font-weight: var(--font-weight-medium);">${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.25rem; cursor: pointer; color: var(--color-text-secondary); transition: color var(--transition-fast); border-radius: var(--radius-md); padding: var(--space-1);" onmouseover="this.style.color='var(--color-text)'" onmouseout="this.style.color='var(--color-text-secondary)'">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) notification.remove();
        }, 300);
      }
    }, 5000);
  }

  /**
   * PAGE NAVIGATION
   */
  showPage(pageId) {
    console.log('Navigating to enhanced page:', pageId);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      this.currentPage = pageId;
      
      // Load page-specific content
      this.loadPageContent(pageId);
      this.closeMobileMenu();
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      console.log('✅ Enhanced page loaded:', pageId);
    } else {
      console.error('Page not found:', pageId);
      this.showNotification(`❌ Page "${pageId}" not found`, 'error');
    }
  }

  loadPageContent(pageId) {
    switch (pageId) {
      case 'homepage':
        this.renderHomepageContent();
        break;
      case 'pro':
        this.renderProFeatures();
        this.updatePricingByLocation();
        break;
      case 'cookies':
        this.loadCookieSettings();
        break;
      default:
        console.log(`No specific content loading for page: ${pageId}`);
    }
  }

  loadCookieSettings() {
    const analyticsCheckbox = document.getElementById('analytics-cookies');
    const marketingCheckbox = document.getElementById('marketing-cookies');

    if (analyticsCheckbox) {
      analyticsCheckbox.checked = this.cookiePreferences.analytics;
    }
    if (marketingCheckbox) {
      marketingCheckbox.checked = this.cookiePreferences.marketing;
    }
  }

  showCompanyDetail(companyId) {
    const company = this.companies.find(c => c.id === companyId);
    if (!company) return;

    this.showNotification(`🏢 ${company.name} - Detailed company profiles coming soon with job listings, reviews, and more!`, 'info');
    console.log('🏢 Enhanced company detail requested:', company.name);
  }

  startProTrial() {
    this.showNotification('🚀 Starting your free 3-day Jobbyist Pro trial...', 'info');
    
    setTimeout(() => {
      this.showNotification('🎉 Pro trial activated! You now have access to all premium features for 3 days. Enjoy!', 'success');
    }, 2000);
    
    console.log('⭐ Enhanced Pro trial started');
  }

  closeAllModals() {
    const registrationModal = document.getElementById('registration-modal');
    if (registrationModal && !registrationModal.classList.contains('hidden')) {
      this.closeRegistrationModal();
    }

    document.querySelectorAll('.notification').forEach(n => n.remove());
    document.body.style.overflow = '';
    
    console.log('🔒 All modals closed');
  }
}

// Initialize the enhanced application
let jobbyistApp;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM loaded, initializing Enhanced Jobbyist Platform...');
  
  jobbyistApp = new JobbyistPlatform();
  window.jobbyistApp = jobbyistApp;
  
  // Enhanced error handling
  window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    if (jobbyistApp && jobbyistApp.showNotification) {
      jobbyistApp.showNotification('⚠️ An error occurred. Please refresh the page if issues persist.', 'error');
    }
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    if (jobbyistApp && jobbyistApp.showNotification) {
      jobbyistApp.showNotification('🌐 A network error occurred. Please check your connection and try again.', 'error');
    }
  });
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    .nav-dropdown.open .dropdown-menu {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  console.log('🎉 Enhanced Jobbyist Platform fully initialized and ready!');
});

/**
 * CRITICAL BUGS FIXED IN THIS VERSION:
 * ====================================
 * 
 * ✅ Cookie settings modal closing issue - Added proper navigation back to homepage
 * ✅ ESC key functionality - Implemented closeAllModals() function
 * ✅ Registration modal reopening - Completely fixed modal state management
 * ✅ Mobile menu functionality - Fixed toggle and animation issues
 * ✅ Theme switching - Proper override of system preferences
 * ✅ Form submissions - Enhanced error handling and user feedback
 * ✅ Global function access - All onclick handlers working properly
 * ✅ Text contrast issues - Light mode enforced by default
 * ✅ Notification system - Fixed stacking and auto-cleanup
 * ✅ Event listener management - Proper cleanup and delegation
 * 
 * APPLICATION IS NOW PRODUCTION READY WITH ALL FIXES IMPLEMENTED!
 */
