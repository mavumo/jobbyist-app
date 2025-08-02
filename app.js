/**
 * JOBBYIST PLATFORM - COMPREHENSIVE BLACK & WHITE DESIGN
 * Modern job platform with all requested features - FIXED VERSION
 */

class JobbyistPlatform {
  constructor() {
    // Core application state
    this.currentLanguage = 'za-en';
    this.currentPage = 'homepage';
    this.isMobileMenuOpen = false;
    this.currentCandidateId = null;
    
    // Modal states
    this.modalState = {
      registrationModal: { 
        isOpen: false,
        currentStep: 1,
        totalSteps: 3,
        selectedJobId: null,
        formData: {}
      },
      ratingModal: {
        isOpen: false,
        companyId: null,
        selectedRating: 0
      }
    };
    
    // Data collections
    this.jobs = [];
    this.companies = [];
    this.candidates = [];
    this.blogPosts = [];
    this.savedJobs = this.loadSavedJobs();
    this.searchHistory = this.loadSearchHistory();
    this.bookmarkedJobs = new Set(this.savedJobs);
    
    // Filter states
    this.candidateFilters = {
      locations: [],
      skills: [],
      experience: 0,
      industry: '',
      availability: false
    };
    
    this.searchSuggestions = [
      'Software Engineer', 'Data Analyst', 'Product Manager', 'UX Designer',
      'Marketing Manager', 'Sales Executive', 'DevOps Engineer', 'Frontend Developer',
      'Backend Developer', 'Full Stack Developer', 'Project Manager', 'Business Analyst'
    ];
    
    // Language configurations
    this.languages = {
      'za-en': { flag: '🇿🇦', name: 'English (SA)', code: 'en' },
      'za-af': { flag: '🇿🇦', name: 'Afrikaans', code: 'af' },
      'ng-en': { flag: '🇳🇬', name: 'English (NG)', code: 'en' },
      'ng-yo': { flag: '🇳🇬', name: 'Yoruba', code: 'yo' },
      'ng-ig': { flag: '🇳🇬', name: 'Igbo', code: 'ig' }
    };
    
    // Chatbot state
    this.chatbotOpen = false;
    this.chatHistory = [];
    
    // Make globally available
    window.jobbyistApp = this;
    
    this.init();
  }

  /**
   * INITIALIZATION
   */
  init() {
    console.log('🚀 Initializing Jobbyist Platform...');
    
    this.loadSampleData();
    this.setupEventListeners();
    this.renderHomepageContent();
    this.setupFileUploads();
    this.setupFormSubmissions();
    this.animateCounters();
    this.initializeAnalytics();
    
    console.log('✅ Platform initialized successfully');
  }

  /**
   * SAMPLE DATA LOADING
   */
  loadSampleData() {
    // Sample Jobs Data
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
        description: 'Join our innovative team building cutting-edge fintech solutions for the African market. Work with React, Node.js, and cloud technologies to create scalable applications.',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        datePosted: '2025-01-30',
        featured: true,
        remote: false,
        companyLogo: 'https://via.placeholder.com/80x80/000000/ffffff?text=TS'
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
        remote: false,
        companyLogo: 'https://via.placeholder.com/80x80/4285f4/ffffff?text=LDH'
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
        remote: true,
        companyLogo: 'https://via.placeholder.com/80x80/34a853/ffffff?text=CA'
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
        featured: false,
        remote: false,
        companyLogo: 'https://via.placeholder.com/80x80/fbbc04/000000?text=ATS'
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
        remote: false,
        companyLogo: 'https://via.placeholder.com/80x80/ea4335/ffffff?text=CS'
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
        remote: true,
        companyLogo: 'https://via.placeholder.com/80x80/9aa0a6/ffffff?text=CSA'
      }
    ];

    // Sample Companies Data (50 companies as requested)
    this.companies = this.generateSampleCompanies();

    // Sample Candidates Data (50 candidates as requested)
    this.candidates = this.generateSampleCandidates();

    // Sample Blog Posts Data (12 posts as requested)
    this.blogPosts = [
      {
        id: 'blog-001',
        title: 'The Future of Remote Work in Africa',
        excerpt: 'Exploring how remote work is transforming the African job market and creating new opportunities.',
        author: 'Sarah Johnson',
        publishDate: '2025-01-28',
        readTime: '5 min read',
        category: 'Remote Work'
      },
      {
        id: 'blog-002',
        title: 'Top Skills in Demand for 2025',
        excerpt: 'Discover the most sought-after skills that employers are looking for this year.',
        author: 'Michael Chen',
        publishDate: '2025-01-25',
        readTime: '7 min read',
        category: 'Career Development'
      },
      {
        id: 'blog-003',
        title: 'Building Your Personal Brand',
        excerpt: 'Learn how to create and maintain a strong professional presence online.',
        author: 'Amina Hassan',
        publishDate: '2025-01-22',
        readTime: '6 min read',
        category: 'Personal Branding'
      },
      {
        id: 'blog-004',
        title: 'Salary Negotiation Tips for African Markets',
        excerpt: 'Navigate salary discussions with confidence using these proven strategies.',
        author: 'David Okafor',
        publishDate: '2025-01-20',
        readTime: '8 min read',
        category: 'Salary & Benefits'
      },
      {
        id: 'blog-005',
        title: 'Tech Startup Scene in Lagos',
        excerpt: 'An inside look at the booming technology ecosystem in Lagos, Nigeria.',
        author: 'Fatima Kone',
        publishDate: '2025-01-18',
        readTime: '9 min read',
        category: 'Tech Industry'
      },
      {
        id: 'blog-006',
        title: 'Interview Preparation Masterclass',
        excerpt: 'Comprehensive guide to acing your next job interview with confidence.',
        author: 'James Miller',
        publishDate: '2025-01-15',
        readTime: '10 min read',
        category: 'Interview Tips'
      },
      {
        id: 'blog-007',
        title: 'Women in Tech: Breaking Barriers',
        excerpt: 'Celebrating achievements and addressing challenges faced by women in technology.',
        author: 'Zara Ahmed',
        publishDate: '2025-01-12',
        readTime: '6 min read',
        category: 'Diversity & Inclusion'
      },
      {
        id: 'blog-008',
        title: 'Fintech Revolution in South Africa',
        excerpt: 'How financial technology is reshaping banking and creating new career opportunities.',
        author: 'Robert van der Merwe',
        publishDate: '2025-01-10',
        readTime: '7 min read',
        category: 'Fintech'
      },
      {
        id: 'blog-009',
        title: 'Freelancing vs Full-time: Pros and Cons',
        excerpt: 'Making the right career choice for your professional goals and lifestyle.',
        author: 'Grace Nakamura',
        publishDate: '2025-01-08',
        readTime: '5 min read',
        category: 'Career Advice'
      },
      {
        id: 'blog-010',
        title: 'AI and Job Market Transformation',
        excerpt: 'Understanding how artificial intelligence is changing the employment landscape.',
        author: 'Ahmed El-Rashid',
        publishDate: '2025-01-05',
        readTime: '8 min read',
        category: 'Artificial Intelligence'
      },
      {
        id: 'blog-011',
        title: 'Green Jobs: Sustainability Careers',
        excerpt: 'Exploring career opportunities in the growing environmental and sustainability sector.',
        author: 'Maria Santos',
        publishDate: '2025-01-03',
        readTime: '6 min read',
        category: 'Sustainability'
      },
      {
        id: 'blog-012',
        title: 'Building Networks Across Africa',
        excerpt: 'Strategies for creating meaningful professional connections across the continent.',
        author: 'Kwame Asante',
        publishDate: '2025-01-01',
        readTime: '7 min read',
        category: 'Networking'
      }
    ];

    console.log('📊 Sample data loaded: Jobs:', this.jobs.length, 'Companies:', this.companies.length, 'Candidates:', this.candidates.length);
  }

  generateSampleCompanies() {
    const companies = [];
    const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Marketing', 'Construction', 'Retail'];
    const locations = ['Lagos, Nigeria', 'Johannesburg, South Africa', 'Cape Town, South Africa', 'Abuja, Nigeria', 'Pretoria, South Africa', 'Durban, South Africa'];
    const sizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];
    
    const companyNames = [
      'TechSA Solutions', 'Lagos Digital Hub', 'Cape Analytics', 'Abuja Tech Solutions', 'Creative Studio CT',
      'Cloud Solutions Africa', 'FinTech Nigeria', 'Healthcare Innovations SA', 'EduTech Lagos', 'Green Energy Cape Town',
      'Data Dynamics JHB', 'Mobile First Nigeria', 'AI Solutions Africa', 'Blockchain South Africa', 'Digital Marketing Lagos',
      'Cyber Security SA', 'E-commerce Nigeria', 'Software House Cape Town', 'Tech Consulting Abuja', 'Innovation Lab JHB',
      'Startup Incubator Lagos', 'Venture Capital SA', 'Research Institute Nigeria', 'Development Agency Cape Town', 'Training Center Abuja',
      'Consultancy Services JHB', 'Marketing Agency Lagos', 'Design Studio SA', 'Engineering Solutions Nigeria', 'Construction Tech Cape Town',
      'Logistics Nigeria', 'Transport SA', 'Agriculture Tech Lagos', 'Mining Solutions JHB', 'Energy Corp Nigeria',
      'Water Solutions SA', 'Waste Management Lagos', 'Solar Energy JHB', 'Wind Power Nigeria', 'Hydro Tech SA',
      'Food Tech Lagos', 'Pharma Nigeria', 'Medical Devices SA', 'Biotech Cape Town', 'Health Services Abuja',
      'Education Platform Nigeria', 'Learning Solutions SA', 'Skills Training Lagos', 'Career Development JHB', 'Professional Services Nigeria'
    ];

    for (let i = 0; i < 50; i++) {
      const name = companyNames[i];
      const industry = industries[Math.floor(Math.random() * industries.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const verified = Math.random() > 0.3;
      const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
      const openJobs = Math.floor(Math.random() * 15) + 1;
      
      companies.push({
        id: `company-${String(i + 1).padStart(3, '0')}`,
        name,
        logo: `https://via.placeholder.com/100x100/${this.getRandomColor()}/ffffff?text=${name.split(' ').map(w => w[0]).join('')}`,
        industry,
        location,
        employees: size,
        openJobs,
        verified,
        rating: parseFloat(rating),
        reviewCount: Math.floor(Math.random() * 200) + 10,
        description: `${name} is a leading ${industry.toLowerCase()} company in ${location.split(',')[0]}. We specialize in innovative solutions and are committed to excellence.`,
        founded: Math.floor(Math.random() * 20) + 2005,
        website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`
      });
    }

    return companies;
  }

  generateSampleCandidates() {
    const candidates = [];
    const firstNames = ['Amara', 'Bode', 'Chidi', 'Dami', 'Emeka', 'Fatima', 'Grace', 'Hassan', 'Ifeoma', 'Jide', 'Kemi', 'Lawal', 'Musa', 'Ngozi', 'Ola', 'Peace', 'Rashid', 'Sarah', 'Tunde', 'Yemi', 'Zara', 'Abdul', 'Busola', 'Chioma', 'David'];
    const lastNames = ['Adebayo', 'Okafor', 'Johnson', 'Williams', 'Ahmed', 'Hassan', 'Ibrahim', 'Ogundimu', 'Nkomo', 'Van Der Merwe', 'Patel', 'Smith', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson'];
    const jobTitles = ['Software Developer', 'Data Analyst', 'Product Manager', 'UX Designer', 'Marketing Manager', 'Sales Executive', 'DevOps Engineer', 'Business Analyst', 'Project Manager', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer'];
    const locations = ['Lagos, Nigeria', 'Johannesburg, South Africa', 'Cape Town, South Africa', 'Abuja, Nigeria', 'Pretoria, South Africa', 'Durban, South Africa', 'Remote'];
    const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Sales'];
    const experienceLevels = ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
    const availabilityStatuses = ['Available', 'Open to opportunities', '2 weeks notice', '1 month notice', 'Not actively looking'];

    for (let i = 0; i < 50; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const industry = industries[Math.floor(Math.random() * industries.length)];
      const experience = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
      const availability = availabilityStatuses[Math.floor(Math.random() * availabilityStatuses.length)];
      const isAvailable = availability === 'Available' || availability === 'Open to opportunities';
      
      const skillSets = {
        'Software Developer': ['JavaScript', 'Python', 'React', 'Node.js', 'Git'],
        'Data Analyst': ['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'],
        'Product Manager': ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'Roadmapping'],
        'UX Designer': ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Design Systems'],
        'Marketing Manager': ['Digital Marketing', 'SEO', 'Google Ads', 'Social Media', 'Analytics'],
        'Sales Executive': ['Sales', 'CRM', 'Lead Generation', 'Negotiation', 'Customer Relations'],
        'DevOps Engineer': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
        'Business Analyst': ['Requirements Analysis', 'Process Modeling', 'SQL', 'Documentation', 'Stakeholder Management'],
        'Project Manager': ['Project Management', 'Agile', 'Scrum', 'Risk Management', 'Team Leadership'],
        'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js'],
        'Backend Developer': ['Node.js', 'Python', 'Java', 'Database Design', 'API Development'],
        'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git']
      };

      candidates.push({
        id: `candidate-${String(i + 1).padStart(3, '0')}`,
        name,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        phone: `+${location.includes('Nigeria') ? '234' : '27'} ${Math.floor(Math.random() * 900000000) + 100000000}`,
        location,
        jobTitle,
        industry,
        experience,
        availability,
        isAvailable,
        skills: skillSets[jobTitle] || ['Communication', 'Problem Solving', 'Teamwork'],
        summary: `Experienced ${jobTitle.toLowerCase()} with ${experience} of experience in ${industry.toLowerCase()}. Passionate about delivering high-quality results and continuous learning.`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${this.getRandomColor()}&color=fff&size=60`,
        resumeUrl: '#',
        linkedinUrl: '#',
        portfolioUrl: Math.random() > 0.5 ? '#' : null,
        education: 'Bachelor\'s Degree',
        languages: ['English'],
        dateRegistered: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }

    return candidates;
  }

  getRandomColor() {
    const colors = ['000000', '4285f4', '34a853', 'fbbc04', 'ea4335', '9aa0a6', '5f6368'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * EVENT LISTENERS SETUP - FIXED
   */
  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMobileMenu();
      });
    }

    // Navigation dropdown toggles - FIXED
    document.addEventListener('click', (e) => {
      const dropdownTrigger = e.target.closest('.dropdown-trigger');
      if (dropdownTrigger) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropdown = dropdownTrigger.closest('.nav-dropdown');
        const isOpen = dropdown.classList.contains('open');
        
        // Close all dropdowns first
        document.querySelectorAll('.nav-dropdown').forEach(d => {
          d.classList.remove('open');
        });
        
        // Toggle current dropdown
        if (!isOpen) {
          dropdown.classList.add('open');
        }
      } else if (!e.target.closest('.nav-dropdown')) {
        // Close all dropdowns when clicking outside
        document.querySelectorAll('.nav-dropdown').forEach(d => {
          d.classList.remove('open');
        });
      }
    });

    // Search form - FIXED
    const heroSearchForm = document.getElementById('hero-search-form');
    if (heroSearchForm) {
      heroSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleSearch(e);
      });
    }

    // Search input for suggestions
    const searchInput = document.getElementById('job-title');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.showSearchSuggestions(e.target.value);
      });
      
      searchInput.addEventListener('focus', (e) => {
        if (e.target.value) this.showSearchSuggestions(e.target.value);
      });
    }

    // Apply buttons and bookmarks - FIXED
    document.addEventListener('click', (e) => {
      const applyBtn = e.target.closest('[data-action="apply"]');
      if (applyBtn) {
        e.preventDefault();
        e.stopPropagation();
        const jobId = applyBtn.getAttribute('data-job-id');
        this.openRegistrationModal(jobId);
        return;
      }
      
      const bookmarkBtn = e.target.closest('.bookmark-btn');
      if (bookmarkBtn) {
        e.preventDefault();
        e.stopPropagation();
        const jobId = bookmarkBtn.getAttribute('data-job-id');
        this.toggleBookmark(jobId);
        return;
      }

      const categoryCard = e.target.closest('.category-card');
      if (categoryCard) {
        e.preventDefault();
        e.stopPropagation();
        const categoryName = categoryCard.querySelector('h3')?.textContent;
        if (categoryName) this.searchByCategory(categoryName);
        return;
      }

      const companyCard = e.target.closest('.company-card');
      if (companyCard && !e.target.closest('button')) {
        e.preventDefault();
        e.stopPropagation();
        const companyId = companyCard.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (companyId) this.viewCompanyDetail(companyId);
        return;
      }

      const candidateCard = e.target.closest('.candidate-card');
      if (candidateCard && !e.target.closest('button')) {
        e.preventDefault();
        e.stopPropagation();
        const candidateId = candidateCard.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (candidateId) this.viewCandidateProfile(candidateId);
        return;
      }
    });

    // View all jobs button - FIXED
    const viewAllJobsBtn = document.getElementById('view-all-jobs');
    if (viewAllJobsBtn) {
      viewAllJobsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.showAllJobs();
      });
    }

    // Candidate filters
    this.setupCandidateFilters();
    
    // Modal setup
    this.setupModalHandlers();
    
    // Form submissions
    this.setupFormSubmissions();
    
    // Chatbot
    this.setupChatbot();

    // ESC key handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
        this.hideSearchSuggestions();
      }
    });

    console.log('🎯 Event listeners configured and FIXED');
  }

  /**
   * NAVIGATION AND LANGUAGE - FIXED
   */
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
  }

  closeMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
    const lang = this.languages[langCode];
    
    // Update language selector
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.innerHTML = `${lang.flag} ${lang.name.split(' ')[0]} <svg class="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8"><path d="M6 8L0 0h12L6 8z"/></svg>`;
    }
    
    this.showNotification(`🌍 Language changed to ${lang.name}`, 'success');
    console.log('🌍 Language set to:', langCode);
  }

  /**
   * SEARCH FUNCTIONALITY - FIXED
   */
  showSearchSuggestions(query) {
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (!suggestionsDiv || !query || query.length < 2) {
      this.hideSearchSuggestions();
      return;
    }

    const filtered = this.searchSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    if (filtered.length === 0) {
      this.hideSearchSuggestions();
      return;
    }

    suggestionsDiv.innerHTML = filtered.map(suggestion => 
      `<div class="suggestion-item" onclick="jobbyistApp.selectSuggestion('${suggestion}')">${suggestion}</div>`
    ).join('');
    
    suggestionsDiv.style.display = 'block';
  }

  hideSearchSuggestions() {
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (suggestionsDiv) {
      suggestionsDiv.style.display = 'none';
    }
  }

  selectSuggestion(suggestion) {
    const searchInput = document.getElementById('job-title');
    if (searchInput) {
      searchInput.value = suggestion;
      this.hideSearchSuggestions();
    }
  }

  handleSearch(e) {
    const formData = new FormData(e.target);
    const searchParams = {
      title: formData.get('title')?.toLowerCase().trim() || '',
      type: formData.get('type') || '',
      location: formData.get('location') || ''
    };

    console.log('🔍 Searching with params:', searchParams);

    // Track search
    this.trackSearch(searchParams);
    
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

    this.displaySearchResults(filteredJobs, searchParams);
    this.scrollToResults();
    
    const message = filteredJobs.length === 0 
      ? '🔍 No jobs found matching your criteria.'
      : `✅ Found ${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''}`;
    
    this.showNotification(message, filteredJobs.length > 0 ? 'success' : 'info');
  }

  showAllJobs() {
    this.displaySearchResults(this.jobs, { showAll: true });
    this.scrollToResults();
    this.showNotification(`✅ Showing all ${this.jobs.length} available jobs`, 'success');
  }

  searchByCategory(categoryName) {
    const categoryKeywords = {
      'Technology': ['software', 'developer', 'engineer', 'tech', 'programmer', 'analyst'],
      'Marketing': ['marketing', 'digital', 'social', 'advertising', 'brand'],
      'Finance': ['finance', 'banking', 'accounting', 'financial'],
      'Healthcare': ['healthcare', 'medical', 'health', 'clinical'],
      'Education': ['education', 'teaching', 'training', 'academic'],
      'Sales': ['sales', 'business development', 'account']
    };
    
    const keywords = categoryKeywords[categoryName] || [];
    const filteredJobs = this.jobs.filter(job => {
      const searchText = (job.title + ' ' + job.description + ' ' + (job.skills?.join(' ') || '')).toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword));
    });
    
    this.displaySearchResults(filteredJobs, { category: categoryName });
    this.scrollToResults();
    this.showNotification(`🎯 Found ${filteredJobs.length} ${categoryName} jobs`, 'success');
  }

  displaySearchResults(jobs, searchParams) {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    if (jobs.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-secondary);">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="margin-bottom: 1rem; color: var(--color-text);">No jobs found</h3>
          <p>Try adjusting your search criteria or browse all jobs.</p>
          <button class="btn--primary glow-effect" onclick="jobbyistApp.showAllJobs();" style="margin-top: 1rem;">
            <span>View All Jobs</span>
          </button>
        </div>
      `;
    } else {
      // Add search context if needed
      let contextHtml = '';
      if (searchParams.category) {
        contextHtml = `
          <div style="grid-column: 1 / -1; background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-xl); margin-bottom: 2rem; border: 2px solid var(--color-border);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="margin: 0; color: var(--color-text);">${searchParams.category} Jobs</h3>
                <p style="margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">Found ${jobs.length} job${jobs.length !== 1 ? 's' : ''}</p>
              </div>
              <button class="btn--secondary" onclick="jobbyistApp.renderJobs();">Clear Filter</button>
            </div>
          </div>
        `;
      } else if (searchParams.showAll) {
        contextHtml = `
          <div style="grid-column: 1 / -1; background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-xl); margin-bottom: 2rem; border: 2px solid var(--color-border);">
            <div style="text-align: center;">
              <h3 style="margin: 0; color: var(--color-text);">All Available Jobs</h3>
              <p style="margin: 0.5rem 0 0 0; color: var(--color-text-secondary);">Showing all ${jobs.length} job listings</p>
            </div>
          </div>
        `;
      }
      
      container.innerHTML = contextHtml + jobs.map(job => this.createJobCard(job)).join('');
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

  trackSearch(params) {
    this.searchHistory.push({
      ...params,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 searches
    if (this.searchHistory.length > 50) {
      this.searchHistory = this.searchHistory.slice(-50);
    }
    
    localStorage.setItem('jobbyist-search-history', JSON.stringify(this.searchHistory));
  }

  loadSearchHistory() {
    try {
      return JSON.parse(localStorage.getItem('jobbyist-search-history') || '[]');
    } catch {
      return [];
    }
  }

  /**
   * JOB BOOKMARKING SYSTEM
   */
  toggleBookmark(jobId) {
    const btn = document.querySelector(`[data-job-id="${jobId}"].bookmark-btn`);
    if (!btn) return;

    if (this.bookmarkedJobs.has(jobId)) {
      this.bookmarkedJobs.delete(jobId);
      btn.classList.remove('bookmarked');
      btn.innerHTML = '🤍';
      this.showNotification('📝 Job removed from saved jobs', 'info');
    } else {
      this.bookmarkedJobs.add(jobId);
      btn.classList.add('bookmarked');
      btn.innerHTML = '💛';
      this.showNotification('⭐ Job saved successfully!', 'success');
    }

    this.savedJobs = Array.from(this.bookmarkedJobs);
    localStorage.setItem('jobbyist-saved-jobs', JSON.stringify(this.savedJobs));
    
    // Update saved jobs page if currently viewing
    if (this.currentPage === 'saved') {
      this.renderSavedJobs();
    }
  }

  loadSavedJobs() {
    try {
      return JSON.parse(localStorage.getItem('jobbyist-saved-jobs') || '[]');
    } catch {
      return [];
    }
  }

  renderSavedJobs() {
    const container = document.getElementById('saved-jobs-container');
    if (!container) return;

    const savedJobsData = this.jobs.filter(job => this.bookmarkedJobs.has(job.id));

    if (savedJobsData.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">💼</div>
          <h3>No Saved Jobs</h3>
          <p>Jobs you bookmark will appear here for easy access.</p>
          <button class="btn--primary glow-effect" onclick="jobbyistApp.showPage('homepage')">
            <span>Browse Jobs</span>
          </button>
        </div>
      `;
    } else {
      container.innerHTML = savedJobsData.map(job => this.createJobCard(job)).join('');
    }
  }

  /**
   * CANDIDATE PROFILE SYSTEM
   */
  setupCandidateFilters() {
    // Location multi-select
    const locationTrigger = document.querySelector('#location-filter .multi-select-trigger');
    const locationDropdown = document.querySelector('#location-filter .multi-select-dropdown');
    
    if (locationTrigger && locationDropdown) {
      locationTrigger.addEventListener('click', () => {
        locationDropdown.classList.toggle('active');
      });

      locationDropdown.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
          this.updateLocationFilter();
        }
      });
    }

    // Skills filter
    const skillsInput = document.querySelector('#skills-filter .skills-input');
    if (skillsInput) {
      skillsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.addSkillChip(e.target.value.trim());
          e.target.value = '';
        }
      });
    }

    // Experience slider
    const experienceSlider = document.getElementById('experience-slider');
    if (experienceSlider) {
      experienceSlider.addEventListener('input', (e) => {
        this.candidateFilters.experience = parseInt(e.target.value);
        this.filterCandidates();
      });
    }

    // Industry filter
    const industryFilter = document.getElementById('industry-filter');
    if (industryFilter) {
      industryFilter.addEventListener('change', (e) => {
        this.candidateFilters.industry = e.target.value;
        this.filterCandidates();
      });
    }

    // Availability toggle
    const availabilityToggle = document.getElementById('availability-toggle');
    if (availabilityToggle) {
      availabilityToggle.addEventListener('change', (e) => {
        this.candidateFilters.availability = e.target.checked;
        this.filterCandidates();
      });
    }
  }

  updateLocationFilter() {
    const checkboxes = document.querySelectorAll('#location-filter input[type="checkbox"]:checked');
    this.candidateFilters.locations = Array.from(checkboxes).map(cb => cb.value);
    this.filterCandidates();
  }

  addSkillChip(skill) {
    if (!skill || this.candidateFilters.skills.includes(skill)) return;

    this.candidateFilters.skills.push(skill);
    this.renderSkillChips();
    this.filterCandidates();
  }

  removeSkillChip(skill) {
    this.candidateFilters.skills = this.candidateFilters.skills.filter(s => s !== skill);
    this.renderSkillChips();
    this.filterCandidates();
  }

  renderSkillChips() {
    const container = document.querySelector('#skills-filter .skills-chips');
    if (!container) return;

    container.innerHTML = this.candidateFilters.skills.map(skill => `
      <div class="skill-chip">
        ${skill}
        <button class="chip-remove" onclick="jobbyistApp.removeSkillChip('${skill}')">&times;</button>
      </div>
    `).join('');
  }

  filterCandidates() {
    const filtered = this.candidates.filter(candidate => {
      // Location filter
      if (this.candidateFilters.locations.length > 0) {
        const matchesLocation = this.candidateFilters.locations.some(loc => 
          candidate.location.includes(loc) || 
          (loc === 'Remote' && candidate.location.includes('Remote'))
        );
        if (!matchesLocation) return false;
      }

      // Skills filter
      if (this.candidateFilters.skills.length > 0) {
        const matchesSkills = this.candidateFilters.skills.some(skill =>
          candidate.skills.some(candidateSkill => 
            candidateSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        if (!matchesSkills) return false;
      }

      // Experience filter (0 = all, 5 = 5+ years, 10 = 10+ years)
      if (this.candidateFilters.experience > 0) {
        const expLevel = candidate.experience;
        const hasRequiredExp = 
          (this.candidateFilters.experience <= 3 && (expLevel === '0-1 years' || expLevel === '1-3 years')) ||
          (this.candidateFilters.experience <= 7 && (expLevel === '3-5 years' || expLevel === '5-10 years')) ||
          (this.candidateFilters.experience > 7 && expLevel === '10+ years');
        if (!hasRequiredExp) return false;
      }

      // Industry filter
      if (this.candidateFilters.industry && candidate.industry !== this.candidateFilters.industry) {
        return false;
      }

      // Availability filter
      if (this.candidateFilters.availability && !candidate.isAvailable) {
        return false;
      }

      return true;
    });

    this.renderCandidates(filtered);
    this.updateCandidatesCount(filtered.length);
  }

  renderCandidates(candidates = this.candidates) {
    const container = document.getElementById('candidates-container');
    if (!container) return;

    if (candidates.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">👥</div>
          <h3>No candidates found</h3>
          <p>Try adjusting your filter criteria.</p>
          <button class="btn--secondary" onclick="jobbyistApp.clearCandidateFilters()">Clear Filters</button>
        </div>
      `;
    } else {
      container.innerHTML = candidates.map(candidate => this.createCandidateCard(candidate)).join('');
    }
  }

  createCandidateCard(candidate) {
    return `
      <div class="candidate-card" onclick="jobbyistApp.viewCandidateProfile('${candidate.id}')">
        <div class="candidate-header">
          <div class="candidate-avatar">${candidate.name.split(' ').map(n => n[0]).join('')}</div>
          <div class="candidate-info">
            <h3>${candidate.name}</h3>
            <div class="candidate-title">${candidate.jobTitle}</div>
            <div class="candidate-location">📍 ${candidate.location}</div>
          </div>
        </div>
        
        <div class="candidate-skills">
          ${candidate.skills.slice(0, 4).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        <div class="candidate-meta">
          <span>📊 ${candidate.experience}</span>
          <span class="availability-status ${candidate.isAvailable ? 'available' : 'not-available'}">
            ${candidate.availability}
          </span>
        </div>
      </div>
    `;
  }

  viewCandidateProfile(candidateId) {
    this.currentCandidateId = candidateId;
    const candidate = this.candidates.find(c => c.id === candidateId);
    
    if (!candidate) {
      this.showNotification('❌ Candidate not found', 'error');
      return;
    }

    // Render candidate detail page
    const detailContainer = document.getElementById('candidate-detail');
    if (detailContainer) {
      detailContainer.innerHTML = `
        <div class="candidate-profile-header">
          <div class="candidate-avatar-large">${candidate.name.split(' ').map(n => n[0]).join('')}</div>
          <div class="candidate-info-detailed">
            <h1>${candidate.name}</h1>
            <h2>${candidate.jobTitle}</h2>
            <div class="candidate-location">📍 ${candidate.location}</div>
            <div class="candidate-contact">
              <span>📧 ${candidate.email}</span>
              <span>📞 ${candidate.phone}</span>
            </div>
          </div>
          <div class="candidate-actions">
            <button class="btn--primary glow-effect">
              <span>Contact Candidate</span>
            </button>
            <span class="availability-status ${candidate.isAvailable ? 'available' : 'not-available'}">
              ${candidate.availability}
            </span>
          </div>
        </div>

        <div class="candidate-details-grid">
          <div class="candidate-summary">
            <h3>Professional Summary</h3>
            <p>${candidate.summary}</p>
          </div>

          <div class="candidate-skills-section">
            <h3>Skills & Expertise</h3>
            <div class="skills-grid">
              ${candidate.skills.map(skill => `<span class="skill-tag-large">${skill}</span>`).join('')}
            </div>
          </div>

          <div class="candidate-experience">
            <h3>Experience</h3>
            <div class="experience-item">
              <div class="experience-level">${candidate.experience}</div>
              <div class="experience-industry">${candidate.industry}</div>
            </div>
          </div>

          <div class="candidate-education">
            <h3>Education</h3>
            <p>${candidate.education}</p>
          </div>
        </div>
      `;
    }

    this.showPage('candidate');
    this.showNotification(`👤 Viewing ${candidate.name}'s profile`, 'info');
  }

  updateCandidatesCount(count) {
    const countElement = document.getElementById('candidates-count');
    if (countElement) {
      countElement.textContent = `${count} candidate${count !== 1 ? 's' : ''} found`;
    }
  }

  clearCandidateFilters() {
    // Reset filters
    this.candidateFilters = {
      locations: [],
      skills: [],
      experience: 0,
      industry: '',
      availability: false
    };

    // Reset UI
    document.querySelectorAll('#location-filter input[type="checkbox"]').forEach(cb => cb.checked = false);
    const skillsInput = document.querySelector('#skills-filter .skills-input');
    if (skillsInput) skillsInput.value = '';
    this.renderSkillChips();
    const expSlider = document.getElementById('experience-slider');
    if (expSlider) expSlider.value = 0;
    const industryFilter = document.getElementById('industry-filter');
    if (industryFilter) industryFilter.value = '';
    const availabilityToggle = document.getElementById('availability-toggle');
    if (availabilityToggle) availabilityToggle.checked = false;

    // Re-render all candidates
    this.renderCandidates();
    this.updateCandidatesCount(this.candidates.length);
    
    this.showNotification('🔄 Filters cleared', 'info');
  }

  /**
   * COMPANY RATING SYSTEM
   */
  openRatingModal(companyId) {
    this.modalState.ratingModal.companyId = companyId;
    this.modalState.ratingModal.selectedRating = 0;
    
    const modal = document.getElementById('rating-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.updateRatingStars(0);
    }
  }

  closeRatingModal() {
    const modal = document.getElementById('rating-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
    this.modalState.ratingModal = { isOpen: false, companyId: null, selectedRating: 0 };
  }

  updateRatingStars(rating) {
    const stars = document.querySelectorAll('#rating-stars .star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.remove('empty');
        star.style.color = 'var(--color-warning)';
      } else {
        star.classList.add('empty');
        star.style.color = 'var(--color-gray-300)';
      }
    });
  }

  /**
   * REGISTRATION MODAL SYSTEM
   */
  setupModalHandlers() {
    // Registration modal
    const regModal = document.getElementById('registration-modal');
    if (regModal) {
      const closeBtn = regModal.querySelector('.modal-close');
      const backdrop = regModal.querySelector('.modal-backdrop');

      if (closeBtn) closeBtn.addEventListener('click', () => this.closeRegistrationModal());
      if (backdrop) backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.closeRegistrationModal();
      });

      // Form navigation
      const nextBtn = document.getElementById('next-step');
      const prevBtn = document.getElementById('prev-step');
      const submitBtn = document.getElementById('submit-registration');

      if (nextBtn) nextBtn.addEventListener('click', () => this.nextRegistrationStep());
      if (prevBtn) prevBtn.addEventListener('click', () => this.prevRegistrationStep());
      if (submitBtn) submitBtn.addEventListener('click', () => this.submitRegistration());
    }

    // Rating modal
    const ratingModal = document.getElementById('rating-modal');
    if (ratingModal) {
      const stars = ratingModal.querySelectorAll('.star');
      stars.forEach((star, index) => {
        star.addEventListener('click', () => {
          this.modalState.ratingModal.selectedRating = index + 1;
          this.updateRatingStars(index + 1);
        });
      });

      const ratingForm = document.getElementById('rating-form');
      if (ratingForm) {
        ratingForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.submitRating(e);
        });
      }
    }
  }

  openRegistrationModal(jobId = null) {
    this.modalState.registrationModal.selectedJobId = jobId;
    this.modalState.registrationModal.currentStep = 1;
    
    const modal = document.getElementById('registration-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      this.showRegistrationStep(1);
      this.updateRegistrationProgress();
    }
  }

  closeRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
    
    // Reset form
    const form = document.getElementById('registration-form');
    const successDiv = document.getElementById('registration-success');
    
    if (form) form.style.display = 'block';
    if (successDiv) successDiv.classList.add('hidden');
    
    this.modalState.registrationModal = { 
      isOpen: false, 
      currentStep: 1, 
      totalSteps: 3, 
      selectedJobId: null,
      formData: {}
    };
  }

  showRegistrationStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(stepEl => {
      stepEl.classList.remove('active');
    });

    // Show current step
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepEl) {
      currentStepEl.classList.add('active');
    }

    // Update navigation buttons  
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const submitBtn = document.getElementById('submit-registration');

    if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';

    if (nextBtn && submitBtn) {
      if (step === this.modalState.registrationModal.totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
      } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
      }
    }

    // Update step indicators
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
        isValid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!isValid) {
      this.showNotification('❗ Please fill in all required fields', 'error');
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
    }

    try {
      // Collect form data
      const form = document.getElementById('registration-form');
      const formData = new FormData(form);
      
      // Add additional data
      formData.append('selectedJobId', this.modalState.registrationModal.selectedJobId || '');
      formData.append('timestamp', new Date().toISOString());
      formData.append('language', this.currentLanguage);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to candidates list (simulate dynamic population)
      const newCandidate = this.createCandidateFromForm(formData);
      this.candidates.unshift(newCandidate);
      
      this.showRegistrationSuccess();
      this.showNotification('🎉 Account created successfully!', 'success');
      
    } catch (error) {
      this.showNotification('❌ Registration failed. Please try again.', 'error');
      if (submitBtn) {
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  }

  createCandidateFromForm(formData) {
    const name = formData.get('fullName');
    const email = formData.get('email');
    const location = formData.get('location');
    const jobTitle = formData.get('currentJobTitle') || 'Professional';
    const experience = formData.get('experience');
    const skills = formData.get('skills')?.split(',').map(s => s.trim()).filter(Boolean) || ['Communication'];
    const industry = formData.get('industry') || 'Other';

    return {
      id: `candidate-${Date.now()}`,
      name,
      email,
      phone: formData.get('phone'),
      location,
      jobTitle,
      industry,
      experience,
      availability: 'Available',
      isAvailable: true,
      skills,
      summary: formData.get('summary') || `Professional ${jobTitle.toLowerCase()} with ${experience} of experience.`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${this.getRandomColor()}&color=fff&size=60`,
      resumeUrl: '#',
      dateRegistered: new Date().toISOString().split('T')[0]
    };
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

    // Update apply button
    const applyBtn = document.getElementById('apply-to-job');
    if (applyBtn && this.modalState.registrationModal.selectedJobId) {
      const job = this.jobs.find(j => j.id === this.modalState.registrationModal.selectedJobId);
      if (job) {
        const applyText = document.getElementById('apply-job-text');
        if (applyText) applyText.textContent = `Apply to ${job.title}`;
        
        applyBtn.onclick = () => {
          this.closeRegistrationModal();
          this.showNotification(`🚀 Application submitted for ${job.title}!`, 'success');
        };
      }
    } else if (applyBtn) {
      applyBtn.onclick = () => {
        this.closeRegistrationModal();
        this.showPage('homepage');
      };
    }
  }

  /**
   * FILE UPLOAD HANDLING
   */
  setupFileUploads() {
    const fileUploadAreas = document.querySelectorAll('.file-upload-area');
    
    fileUploadAreas.forEach(area => {
      const fileInput = area.querySelector('.file-input');
      if (!fileInput) return;

      // Click to upload
      area.addEventListener('click', () => fileInput.click());

      // File selection
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) this.handleFileSelect(file, area);
      });

      // Drag and drop
      area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.classList.add('dragover');
      });

      area.addEventListener('dragleave', () => {
        area.classList.remove('dragover');
      });

      area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.handleFileSelect(files[0], area);
        }
      });
    });
  }

  handleFileSelect(file, uploadArea) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
      'image/jpg'
    ];

    if (file.size > maxSize) {
      this.showNotification('📄 File too large. Maximum 10MB allowed.', 'error');
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      this.showNotification('📄 File type not supported.', 'error');
      return;
    }

    // Show preview
    const uploadContent = uploadArea.querySelector('.file-upload-content');
    const preview = uploadArea.querySelector('.file-preview');
    
    uploadContent.style.display = 'none';
    preview.style.display = 'flex';
    preview.innerHTML = `
      <div style="width: 48px; height: 48px; background: var(--gradient-glow); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">📄</div>
      <div style="flex: 1;">
        <div style="font-weight: 600; margin-bottom: 0.25rem;">${file.name}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${this.formatFileSize(file.size)}</div>
      </div>
      <button type="button" onclick="jobbyistApp.removeFile(this)" style="background: none; border: none; color: var(--color-text-secondary); cursor: pointer; padding: 0.5rem;">&times;</button>
    `;

    this.showNotification('✅ File uploaded successfully!', 'success');
  }

  removeFile(button) {
    const uploadArea = button.closest('.file-upload-area');
    const uploadContent = uploadArea.querySelector('.file-upload-content');
    const preview = uploadArea.querySelector('.file-preview');
    const fileInput = uploadArea.querySelector('.file-input');

    fileInput.value = '';
    uploadContent.style.display = 'flex';
    preview.style.display = 'none';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * FORM SUBMISSIONS
   */
  setupFormSubmissions() {
    const forms = [
      'contact-form',
      'claim-profile-form', 
      'recruitment-waitlist-form',
      'forum-access-form'
    ];

    forms.forEach(formId => {
      const form = document.getElementById(formId);
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleFormSubmission(e, formId);
        });
      }
    });
  }

  async handleFormSubmission(e, formId) {
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;

    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    try {
      const formData = new FormData(form);
      formData.append('formType', formId);
      formData.append('timestamp', new Date().toISOString());
      formData.append('language', this.currentLanguage);
      
      // Simulate API call to Formspree
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      form.reset();
      
      const messages = {
        'contact-form': '📧 Message sent! We\'ll respond within 24 hours.',
        'claim-profile-form': '🏢 Profile claim submitted! We\'ll verify your company details.',
        'recruitment-waitlist-form': '🎯 Added to waitlist! You\'ll get early access to our recruitment suite.',
        'forum-access-form': '🔐 Access request submitted! Check your email for the magic link.'
      };
      
      this.showNotification(messages[formId] || 'Form submitted successfully!', 'success');
      
      // Special handling for forum access
      if (formId === 'forum-access-form') {
        setTimeout(() => {
          const authGate = document.getElementById('forum-auth-gate');
          const forumMain = document.getElementById('forum-main');
          if (authGate) authGate.style.display = 'none';
          if (forumMain) {
            forumMain.classList.remove('hidden');
            this.renderForumPosts();
          }
        }, 2000);
      }
      
    } catch (error) {
      this.showNotification('❌ Submission failed. Please try again.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  }

  /**
   * CHATBOT SYSTEM
   */
  setupChatbot() {
    const trigger = document.getElementById('chatbot-trigger');
    const input = document.getElementById('chatbot-input');
    
    if (trigger) {
      trigger.addEventListener('click', () => this.toggleChatbot());
    }
    
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendChatMessage();
        }
      });
    }
  }

  toggleChatbot() {
    const panel = document.getElementById('chatbot-panel');
    if (!panel) return;

    this.chatbotOpen = !this.chatbotOpen;
    
    if (this.chatbotOpen) {
      panel.classList.remove('hidden');
    } else {
      panel.classList.add('hidden');
    }
  }

  sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(userMessage);

    // Clear input
    input.value = '';

    // Generate bot response
    setTimeout(() => {
      const botResponse = this.generateChatbotResponse(message);
      const botMessage = document.createElement('div');
      botMessage.className = 'bot-message';
      botMessage.innerHTML = `<p>${botResponse}</p>`;
      messagesContainer.appendChild(botMessage);
      
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  generateChatbotResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('job') || msg.includes('work')) {
      return "I can help you find jobs! Use our search feature to filter by location, job type, and skills. We have opportunities across South Africa and Nigeria.";
    } else if (msg.includes('company') || msg.includes('employer')) {
      return "Looking to hire? Check out our Recruitment Suite for advanced hiring tools, or claim your company profile to attract top talent!";
    } else if (msg.includes('salary') || msg.includes('pay')) {
      return "Salary information varies by role and location. Our job listings include salary ranges when provided by employers. Jobbyist Pro members get access to detailed salary insights.";
    } else if (msg.includes('remote')) {
      return "We have many remote opportunities! Filter jobs by 'Remote' in the location field to see all remote positions available.";
    } else if (msg.includes('help') || msg.includes('support')) {
      return "I'm here to help! You can contact our support team through the Contact page, or browse our Help Center for common questions.";
    } else {
      return "Thanks for your question! For specific inquiries, please contact our support team. I can help you navigate the platform - try asking about jobs, companies, or remote work!";
    }
  }

  /**
   * CONTENT RENDERING
   */
  renderHomepageContent() {
    this.renderJobCategories();
    this.renderJobs();
    this.renderCompaniesPreview();
    this.renderBlogPosts();
  }

  renderJobCategories() {
    const container = document.getElementById('categories-grid');
    if (!container) return;

    const categories = [
      { name: 'Technology', icon: '💻', count: '1,250+' },
      { name: 'Marketing', icon: '📊', count: '890+' },
      { name: 'Finance', icon: '💰', count: '675+' },
      { name: 'Healthcare', icon: '🏥', count: '540+' },
      { name: 'Education', icon: '🎓', count: '420+' },
      { name: 'Sales', icon: '📈', count: '380+' }
    ];

    container.innerHTML = categories.map(category => `
      <div class="category-card">
        <div class="category-icon">
          <div style="font-size: 2rem;">${category.icon}</div>
        </div>
        <h3>${category.name}</h3>
        <p>${category.count} jobs</p>
      </div>
    `).join('');
  }

  renderJobs() {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    const featuredJobs = this.jobs.filter(job => job.featured).slice(0, 6);
    container.innerHTML = featuredJobs.map(job => this.createJobCard(job)).join('');
  }

  createJobCard(job) {
    const salaryText = this.formatSalary(job.salaryMin, job.salaryMax, job.currency);
    const skillTags = job.skills ? job.skills.slice(0, 3).map(skill => 
      `<span class="job-tag">${skill}</span>`
    ).join('') : '';
    
    const isBookmarked = this.bookmarkedJobs.has(job.id);
    
    return `
      <div class="job-card" data-job-id="${job.id}">
        <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-job-id="${job.id}">
          ${isBookmarked ? '💛' : '🤍'}
        </button>
        
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

  renderCompaniesPreview() {
    const container = document.getElementById('companies-preview-container');
    if (!container) return;

    const featuredCompanies = this.companies.slice(0, 3);
    
    container.innerHTML = featuredCompanies.map(company => `
      <div class="company-card" onclick="jobbyistApp.viewCompanyDetail('${company.id}')">
        <div class="company-header">
          <div class="company-logo">
            <img src="${company.logo}" alt="${company.name} logo" />
          </div>
          <div class="company-info">
            <h3>
              ${company.name}
              ${company.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            </h3>
            <div class="company-meta">
              ${company.industry} • ${company.location}
            </div>
            <div class="company-rating">
              <div class="rating-stars">
                ${this.renderStars(company.rating)}
              </div>
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">
                ${company.rating} (${company.reviewCount} reviews)
              </span>
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
  }

  renderBlogPosts() {
    const container = document.getElementById('blog-container');
    if (!container) return;

    container.innerHTML = this.blogPosts.slice(0, 6).map(post => `
      <div class="blog-card" onclick="jobbyistApp.viewBlogPost('${post.id}')">
        <div class="blog-meta">
          ${post.author} • ${this.getRelativeTime(post.publishDate)} • ${post.readTime}
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div class="blog-category" style="margin-top: 1rem; font-size: 0.75rem; color: var(--color-accent);">
          ${post.category}
        </div>
      </div>
    `).join('');
  }

  renderForumPosts() {
    const container = document.getElementById('forum-posts-container');
    if (!container) return;

    container.innerHTML = this.blogPosts.map(post => `
      <div class="blog-card">
        <div class="blog-meta">
          ${post.author} • ${this.getRelativeTime(post.publishDate)} • ${post.readTime}
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div class="blog-category" style="font-size: 0.75rem; color: var(--color-accent);">
            ${post.category}
          </div>
          <button class="btn--secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
            <span>Read More</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  renderSampleCompanies() {
    const container = document.getElementById('sample-companies-grid');
    if (!container) return;

    const sampleCompanies = this.companies.slice(0, 8);
    
    container.innerHTML = sampleCompanies.map(company => `
      <div class="sample-company-item">
        <div class="sample-company-logo" style="background-image: url('${company.logo}'); background-size: cover;"></div>
        <div>
          <div style="font-weight: 600; font-size: 0.875rem;">${company.name}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${company.industry}</div>
        </div>
      </div>
    `).join('');
  }

  renderAllCompanies() {
    const container = document.getElementById('all-companies-container');
    if (!container) return;

    container.innerHTML = this.companies.map(company => `
      <div class="company-card" onclick="jobbyistApp.viewCompanyDetail('${company.id}')">
        <div class="company-header">
          <div class="company-logo">
            <img src="${company.logo}" alt="${company.name} logo" />
          </div>
          <div class="company-info">
            <h3>
              ${company.name}
              ${company.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            </h3>
            <div class="company-meta">
              ${company.industry} • ${company.location}
            </div>
            <div class="company-rating">
              <div class="rating-stars">
                ${this.renderStars(company.rating)}
              </div>
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">
                ${company.rating} (${company.reviewCount} reviews)
              </span>
              <button class="btn--secondary" onclick="event.stopPropagation(); jobbyistApp.openRatingModal('${company.id}')" style="margin-left: 1rem; padding: 0.25rem 0.75rem; font-size: 0.75rem;">
                Rate Company
              </button>
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
  }

  /**
   * UTILITY FUNCTIONS
   */
  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<span class="star">★</span>';
    }
    
    if (hasHalfStar) {
      starsHtml += '<span class="star">★</span>';
    }
    
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      starsHtml += '<span class="star empty">★</span>';
    }

    return starsHtml;
  }

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
    
    if (min === max) return formatNumber(min);
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

  animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 60;
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
          setTimeout(() => animateCounter(entry.target), Math.random() * 500);
        }
      });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
  }

  initializeAnalytics() {
    // Track page views and user interactions
    this.analytics = {
      pageViews: {},
      searches: [],
      applications: [],
      bookmarks: []
    };

    // Load existing analytics
    try {
      const saved = localStorage.getItem('jobbyist-analytics');
      if (saved) {
        this.analytics = { ...this.analytics, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load analytics data');
    }

    console.log('📊 Analytics initialized');
  }

  trackEvent(eventType, data) {
    if (!this.analytics[eventType]) {
      this.analytics[eventType] = [];
    }

    this.analytics[eventType].push({
      ...data,
      timestamp: new Date().toISOString(),
      language: this.currentLanguage
    });

    // Save to localStorage
    try {
      localStorage.setItem('jobbyist-analytics', JSON.stringify(this.analytics));
    } catch (e) {
      console.warn('Could not save analytics data');
    }
  }

  /**
   * PAGE NAVIGATION - FIXED
   */
  showPage(pageId) {
    console.log('🔄 Navigating to page:', pageId);
    
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
      
      // Track page view
      this.trackEvent('pageViews', { page: pageId });
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      this.showNotification(`📄 Navigated to ${pageId}`, 'info');
      console.log('✅ Page loaded:', pageId);
    } else {
      this.showNotification(`❌ Page "${pageId}" not found`, 'error');
      console.error('Page not found:', pageId);
    }
  }

  loadPageContent(pageId) {
    switch (pageId) {
      case 'homepage':
        this.renderHomepageContent();
        break;
      case 'claim-profile':
        this.renderSampleCompanies();
        break;
      case 'candidate-profiles':
        this.renderCandidates();
        this.updateCandidatesCount(this.candidates.length);
        break;
      case 'companies':
        this.renderAllCompanies();
        break;
      case 'saved':
        this.renderSavedJobs();
        break;
      case 'community-forum':
        // Forum content loaded after auth
        break;
    }
  }

  viewCompanyDetail(companyId) {
    const company = this.companies.find(c => c.id === companyId);
    if (!company) return;

    this.showNotification(`🏢 ${company.name} - ${company.openJobs} open positions available`, 'info');
  }

  viewBlogPost(postId) {
    const post = this.blogPosts.find(p => p.id === postId);
    if (!post) return;

    this.showNotification(`📖 "${post.title}" - Full article coming soon!`, 'info');
  }

  submitRating(e) {
    const formData = new FormData(e.target);
    const rating = this.modalState.ratingModal.selectedRating;
    const review = formData.get('review');
    const companyId = this.modalState.ratingModal.companyId;

    if (rating === 0) {
      this.showNotification('⭐ Please select a rating', 'error');
      return;
    }

    // Update company rating (simulate)
    const company = this.companies.find(c => c.id === companyId);
    if (company) {
      // Simple rating calculation
      const totalRating = (company.rating * company.reviewCount) + rating;
      company.reviewCount += 1;
      company.rating = (totalRating / company.reviewCount);
    }

    this.closeRatingModal();
    this.showNotification('🌟 Thank you for your review!', 'success');
    
    // Re-render companies if on companies page
    if (this.currentPage === 'companies') {
      this.renderAllCompanies();
    }
  }

  /**
   * NOTIFICATION SYSTEM
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
      background: var(--color-white);
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
        <span style="flex: 1; font-weight: 500;">${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.25rem; cursor: pointer; color: var(--color-text-secondary); padding: var(--space-1); border-radius: var(--radius-md);">&times;</button>
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

  closeAllModals() {
    this.closeRegistrationModal();
    this.closeRatingModal();
    if (this.chatbotOpen) this.toggleChatbot();
  }
}

// Initialize the application
let jobbyistApp;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM loaded, initializing Jobbyist Platform...');
  
  jobbyistApp = new JobbyistPlatform();
  
  // Global error handling
  window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    if (jobbyistApp?.showNotification) {
      jobbyistApp.showNotification('⚠️ An error occurred. Please refresh if issues persist.', 'error');
    }
  });

  // Add required CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    .nav-dropdown.open .dropdown-menu {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
    }
    
    .candidate-profile-header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 2rem;
      align-items: center;
      margin-bottom: 2rem;
      padding: 2rem;
      background: var(--color-surface);
      border-radius: var(--radius-xl);
      border: 2px solid var(--color-border);
    }
    
    .candidate-avatar-large {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: var(--gradient-glow);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      font-weight: bold;
    }
    
    .candidate-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    
    .candidate-summary,
    .candidate-skills-section,
    .candidate-experience,
    .candidate-education {
      background: var(--color-surface);
      padding: 1.5rem;
      border-radius: var(--radius-xl);
      border: 2px solid var(--color-border);
    }
    
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .skill-tag-large {
      background: var(--color-accent);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .candidate-profile-header {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 1rem;
      }
      
      .candidate-details-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `;
  document.head.appendChild(style);
  
  console.log('🎉 Jobbyist Platform fully initialized and FIXED!');
});
