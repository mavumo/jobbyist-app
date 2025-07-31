// Enhanced Jobbyist Application with Backend Automation and Multi-Page Support - Bug Fixes
class JobbyistApp {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.jobs = [];
    this.companies = [];
    this.filteredJobs = [];
    this.filteredCompanies = [];
    this.isAnimating = false;
    this.currentStep = 1;
    this.totalSteps = 4;
    this.formData = {};
    this.selectedJob = null;
    this.currentPage = 'homepage';
    this.automationConfig = {};
    
    // Enhanced sample job data with Google Jobs schema compliance
    this.sampleJobs = [
      {
        id: "job-001",
        title: "Senior Software Engineer",
        company: "TechSA Solutions",
        location: "Johannesburg, GP, South Africa",
        country: "South Africa",
        currency: "ZAR",
        salaryMin: 450000,
        salaryMax: 650000,
        employmentType: "Full-time",
        industry: "Technology",
        description: "We are seeking a Senior Software Engineer to join our dynamic team in Johannesburg. Work on cutting-edge fintech solutions and contribute to Africa's digital transformation.",
        requirements: [
          "5+ years of software development experience",
          "Proficiency in React, Node.js, and TypeScript",
          "Experience with AWS or Azure cloud platforms",
          "Strong problem-solving and communication skills"
        ],
        datePosted: "2025-01-25",
        applicationUrl: "https://techsa.com/apply/001",
        companyLogo: "https://via.placeholder.com/100x100/0066cc/white?text=TechSA",
        validThrough: "2025-02-25",
        workFromHome: false,
        jobBenefits: "Health insurance, Remote work options, Professional development",
        qualifications: "Bachelor's degree in Computer Science or related field"
      },
      {
        id: "job-002", 
        title: "Digital Marketing Manager",
        company: "Lagos Digital Hub",
        location: "Lagos, Nigeria",
        country: "Nigeria",
        currency: "NGN",
        salaryMin: 2400000,
        salaryMax: 3600000,
        employmentType: "Full-time",
        industry: "Marketing",
        description: "Join our growing marketing team in Lagos to drive digital transformation across West Africa. Lead innovative campaigns and build brand presence.",
        requirements: [
          "3+ years of marketing management experience",
          "Digital marketing and social media expertise",
          "Team leadership and project management skills",
          "Experience with analytics tools"
        ],
        datePosted: "2025-01-26",
        applicationUrl: "https://lagosdigital.com/apply/002",
        companyLogo: "https://via.placeholder.com/100x100/00cc66/white?text=LDH",
        validThrough: "2025-02-26",
        workFromHome: true,
        jobBenefits: "Flexible hours, Health insurance, Training budget",
        qualifications: "Bachelor's degree in Marketing or Business"
      },
      {
        id: "job-003",
        title: "Data Analyst",
        company: "Cape Analytics",
        location: "Cape Town, WC, South Africa", 
        country: "South Africa",
        currency: "ZAR",
        salaryMin: 380000,
        salaryMax: 520000,
        employmentType: "Full-time",
        industry: "Analytics",
        description: "Seeking a Data Analyst to extract insights from complex datasets and drive strategic business decisions using cutting-edge analytics tools.",
        requirements: [
          "Strong skills in Python, SQL, and Excel",
          "Experience with Tableau, Power BI, or similar tools",
          "Statistical analysis and data visualization expertise",
          "2+ years of data analysis experience"
        ],
        datePosted: "2025-01-24",
        applicationUrl: "https://capeanalytics.com/apply/003",
        companyLogo: "https://via.placeholder.com/100x100/cc6600/white?text=CA",
        validThrough: "2025-02-24",
        workFromHome: false,
        jobBenefits: "Health insurance, Performance bonuses, Learning opportunities",
        qualifications: "Degree in Statistics, Mathematics, or related field"
      },
      {
        id: "job-004",
        title: "Frontend Developer",
        company: "Abuja Tech Solutions",
        location: "Abuja, Nigeria",
        country: "Nigeria",
        currency: "NGN",
        salaryMin: 1800000,
        salaryMax: 2800000,
        employmentType: "Full-time",
        industry: "Technology",
        description: "Build responsive and interactive web applications using modern JavaScript frameworks. Join our dynamic team and work on exciting projects for clients across Africa.",
        requirements: [
          "Strong proficiency in JavaScript, HTML, and CSS",
          "Experience with React or Vue.js",
          "Knowledge of responsive design principles",
          "2+ years of frontend development experience"
        ],
        datePosted: "2025-01-23",
        applicationUrl: "https://abujatech.com/jobs/frontend-dev",
        companyLogo: "https://via.placeholder.com/100x100/9333ea/white?text=ATS",
        validThrough: "2025-02-23",
        workFromHome: true,
        jobBenefits: "Remote work, Health insurance, Learning budget",
        qualifications: "Bachelor's degree in Computer Science or related field"
      },
      {
        id: "job-005",
        title: "Product Manager",
        company: "Innovation Labs Nigeria",
        location: "Lagos, Nigeria",
        country: "Nigeria",
        currency: "NGN",
        salaryMin: 3200000,
        salaryMax: 4800000,
        employmentType: "Full-time",
        industry: "Technology",
        description: "Lead product development and strategy for our innovative mobile and web applications. Work with cross-functional teams to deliver exceptional user experiences.",
        requirements: [
          "4+ years of product management experience",
          "Experience with Agile development methodologies",
          "Strong analytical and problem-solving skills",
          "User research and data analysis expertise"
        ],
        datePosted: "2025-01-22",
        applicationUrl: "https://innovationlabs.ng/careers/product-manager",
        companyLogo: "https://via.placeholder.com/100x100/10b981/white?text=ILN",
        validThrough: "2025-02-22",
        workFromHome: true,
        jobBenefits: "Equity options, Health insurance, Flexible hours",
        qualifications: "Bachelor's degree in Business or technical field"
      }
    ];

    // Enhanced company data
    this.sampleCompanies = [
      {
        id: "company-001",
        name: "TechSA Solutions",
        slug: "techsa-solutions",
        logo: "https://via.placeholder.com/200x100/0066cc/white?text=TechSA",
        industry: "Technology",
        location: "Johannesburg, South Africa",
        country: "South Africa",
        description: "Leading technology solutions provider in South Africa specializing in enterprise software development and digital transformation.",
        founded: 2018,
        employees: "50-200",
        website: "https://techsa.com",
        openPositions: 2,
        claimed: true,
        culture: "Innovation-driven, collaborative environment with focus on work-life balance",
        values: ["Innovation", "Collaboration", "Excellence", "Integrity"],
        benefits: ["Health Insurance", "Remote Work", "Learning Budget", "Flexible Hours"],
        socialLinks: {
          linkedin: "https://linkedin.com/company/techsa",
          twitter: "https://twitter.com/techsa"
        },
        contactInfo: {
          email: "careers@techsa.com",
          phone: "+27-11-123-4567",
          address: "123 Main Street, Johannesburg, GP 2000"
        }
      },
      {
        id: "company-002",
        name: "Lagos Digital Hub",
        slug: "lagos-digital-hub", 
        logo: "https://via.placeholder.com/200x100/00cc66/white?text=LDH",
        industry: "Digital Marketing",
        location: "Lagos, Nigeria",
        country: "Nigeria",
        description: "Premier digital marketing agency serving clients across West Africa with innovative marketing solutions and creative campaigns.",
        founded: 2020,
        employees: "20-50",
        website: "https://lagosdigital.com",
        openPositions: 1,
        claimed: true,
        culture: "Creative, fast-paced environment with opportunities for growth and innovation",
        values: ["Creativity", "Results", "Teamwork", "Growth"],
        benefits: ["Health Insurance", "Flexible Hours", "Creative Freedom", "Career Development"],
        socialLinks: {
          linkedin: "https://linkedin.com/company/lagosdigital",
          twitter: "https://twitter.com/lagosdigital"
        },
        contactInfo: {
          email: "careers@lagosdigital.com",
          phone: "+234-1-234-5678",
          address: "456 Victoria Island, Lagos, Nigeria"
        }
      },
      {
        id: "company-003",
        name: "Cape Analytics",
        slug: "cape-analytics",
        logo: "https://via.placeholder.com/200x100/cc6600/white?text=CA", 
        industry: "Data & Analytics",
        location: "Cape Town, South Africa",
        country: "South Africa",
        description: "Data analytics consultancy helping businesses make data-driven decisions through advanced analytics and machine learning solutions.",
        founded: 2019,
        employees: "10-50", 
        website: "https://capeanalytics.com",
        openPositions: 1,
        claimed: false,
        culture: "Data-driven, analytical mindset with focus on continuous learning and innovation",
        values: ["Accuracy", "Innovation", "Learning", "Impact"],
        benefits: ["Health Insurance", "Learning Budget", "Flexible Work", "Performance Bonuses"],
        socialLinks: {
          linkedin: "https://linkedin.com/company/capeanalytics"
        },
        contactInfo: {
          email: "hello@capeanalytics.com",
          phone: "+27-21-987-6543",
          address: "789 Waterfront, Cape Town, WC 8000"
        }
      },
      {
        id: "company-004",
        name: "Abuja Tech Solutions",
        slug: "abuja-tech-solutions",
        logo: "https://via.placeholder.com/200x100/9333ea/white?text=ATS",
        industry: "Technology",
        location: "Abuja, Nigeria",
        country: "Nigeria",
        description: "Innovative technology company building scalable solutions for the African market with focus on mobile-first applications.",
        founded: 2021,
        employees: "10-50",
        website: "https://abujatech.com",
        openPositions: 1,
        claimed: true,
        culture: "Fast-paced startup environment with focus on innovation and rapid growth",
        values: ["Innovation", "Speed", "Quality", "Impact"],
        benefits: ["Equity Options", "Remote Work", "Health Insurance", "Learning Budget"],
        socialLinks: {
          linkedin: "https://linkedin.com/company/abujatech"
        },
        contactInfo: {
          email: "careers@abujatech.com",
          phone: "+234-9-876-5432",
          address: "321 Central District, Abuja, Nigeria"
        }
      }
    ];

    // Backend automation configuration
    this.automationConfig = {
      googleSheetsConfig: {
        spreadsheetId: "1BxiMVs0XRA5nFMdKWLCYWQ-sample-id",
        range: "Jobs!A1:K1000",
        columns: ["Job Title", "Company Name", "Location", "Country", "Description", "Salary Min", "Salary Max", "Employment Type", "Industry", "Date Posted", "Application URL"]
      },
      zapierWebhooks: {
        newJobWebhook: "https://hooks.zapier.com/hooks/catch/sample/new-job/",
        updateJobWebhook: "https://hooks.zapier.com/hooks/catch/sample/update-job/",
        deleteJobWebhook: "https://hooks.zapier.com/hooks/catch/sample/delete-job/"
      },
      automationStatus: {
        isRunning: false,
        lastSync: null,
        totalJobsProcessed: 0,
        errors: []
      }
    };

    this.init();
  }

  init() {
    this.setTheme(this.theme);
    this.setupEventListeners();
    this.jobs = [...this.sampleJobs];
    this.companies = [...this.sampleCompanies];
    this.filteredJobs = [...this.jobs];
    this.filteredCompanies = [...this.companies];
    this.displayJobs();
    this.animateCounters();
    this.setupIntersectionObserver();
    this.initializeAnimations();
    this.loadSavedFormData();
    this.setupBackendAutomation();
    this.addStructuredData();
    this.updatePageSEO();
  }

  // Backend Automation Features
  setupBackendAutomation() {
    // Simulate automated job processing
    this.startAutomatedJobProcessing();
    
    // Setup webhook listeners (simulated)
    this.setupWebhookListeners();
    
    // Initialize Google Sheets integration (simulated)
    this.initializeGoogleSheetsIntegration();
  }

  startAutomatedJobProcessing() {
    console.log('🤖 Starting automated job processing...');
    this.automationConfig.automationStatus.isRunning = true;
    
    // Simulate processing jobs every 30 seconds
    setInterval(() => {
      this.processJobUpdates();
    }, 30000);
  }

  async processJobUpdates() {
    try {
      console.log('📊 Processing job updates from Google Sheets...');
      
      // Simulate fetching data from Google Sheets
      const newJobData = await this.fetchFromGoogleSheets();
      
      if (newJobData && newJobData.length > 0) {
        const processedJobs = this.transformGoogleSheetsData(newJobData);
        this.updateJobListings(processedJobs);
        
        this.automationConfig.automationStatus.totalJobsProcessed += processedJobs.length;
        this.automationConfig.automationStatus.lastSync = new Date().toISOString();
        
        console.log(`✅ Processed ${processedJobs.length} job updates`);
      }
      
    } catch (error) {
      console.error('❌ Error processing job updates:', error);
      this.automationConfig.automationStatus.errors.push({
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }

  async fetchFromGoogleSheets() {
    // Simulate Google Sheets API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate random new job data
        if (Math.random() > 0.7) {
          resolve([
            {
              "Job Title": "UI/UX Designer",
              "Company Name": "Design Studio Cape Town", 
              "Location": "Cape Town, South Africa",
              "Country": "South Africa",
              "Description": "Create beautiful user interfaces and experiences for web and mobile applications",
              "Salary Min": "320000",
              "Salary Max": "480000",
              "Employment Type": "Full-time",
              "Industry": "Design",
              "Date Posted": new Date().toISOString().split('T')[0],
              "Application URL": "https://designstudio.co.za/careers/uiux"
            }
          ]);
        } else {
          resolve([]);
        }
      }, 1000);
    });
  }

  transformGoogleSheetsData(sheetData) {
    return sheetData.map((row, index) => ({
      id: `job-${Date.now()}-${index}`,
      title: row["Job Title"],
      company: row["Company Name"],
      location: row["Location"],
      country: row["Country"],
      currency: row["Country"] === "Nigeria" ? "NGN" : "ZAR",
      salaryMin: parseInt(row["Salary Min"]),
      salaryMax: parseInt(row["Salary Max"]),
      employmentType: row["Employment Type"],
      industry: row["Industry"],
      description: row["Description"],
      datePosted: row["Date Posted"],
      applicationUrl: row["Application URL"],
      companyLogo: `https://via.placeholder.com/100x100/0066cc/white?text=${row["Company Name"].substring(0, 3).toUpperCase()}`,
      validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      workFromHome: Math.random() > 0.5,
      jobBenefits: "Health insurance, Professional development",
      qualifications: "Relevant degree and experience required"
    }));
  }

  updateJobListings(newJobs) {
    // Add new jobs to the beginning of the array
    this.jobs = [...newJobs, ...this.jobs];
    this.filteredJobs = [...this.jobs];
    
    // Update the display
    this.displayJobs();
    
    // Add structured data for new jobs
    this.addJobStructuredData(newJobs);
    
    // Show notification
    if (newJobs.length > 0) {
      this.showNotification(`🎉 ${newJobs.length} new job${newJobs.length > 1 ? 's' : ''} added automatically!`, 'success');
    }
  }

  setupWebhookListeners() {
    // Simulate webhook endpoints
    console.log('🔗 Setting up Zapier webhook listeners...');
    
    // In a real implementation, these would be actual webhook endpoints
    window.addEventListener('message', (event) => {
      if (event.data.type === 'zapier-webhook') {
        this.handleWebhookData(event.data);
      }
    });
  }

  handleWebhookData(webhookData) {
    console.log('📥 Received webhook data:', webhookData);
    
    switch (webhookData.action) {
      case 'new-job':
        this.handleNewJobWebhook(webhookData.data);
        break;
      case 'update-job':
        this.handleUpdateJobWebhook(webhookData.data);
        break;
      case 'delete-job':
        this.handleDeleteJobWebhook(webhookData.data);
        break;
      default:
        console.warn('Unknown webhook action:', webhookData.action);
    }
  }

  handleNewJobWebhook(jobData) {
    const newJob = this.transformWebhookJobData(jobData);
    this.jobs.unshift(newJob);
    this.filteredJobs = [...this.jobs];
    this.displayJobs();
    this.addJobStructuredData([newJob]);
    this.showNotification('New job added via Zapier automation!', 'success');
  }

  initializeGoogleSheetsIntegration() {
    console.log('📈 Initializing Google Sheets integration...');
    
    // Simulate Google Sheets API initialization
    this.googleSheetsAPI = {
      connected: true,
      lastUpdate: new Date().toISOString(),
      sheetUrl: `https://docs.google.com/spreadsheets/d/${this.automationConfig.googleSheetsConfig.spreadsheetId}`
    };
  }

  generateCSVForGoogleSheets() {
    const headers = this.automationConfig.googleSheetsConfig.columns;
    const csvData = [headers];
    
    // Add job data
    this.jobs.forEach(job => {
      const row = [
        job.title,
        job.company,
        job.location,
        job.country,
        job.description,
        job.salaryMin,
        job.salaryMax,
        job.employmentType,
        job.industry,
        job.datePosted,
        job.applicationUrl
      ];
      csvData.push(row);
    });
    
    // Convert to CSV string
    const csvString = csvData.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');
    
    console.log('📊 Generated CSV for Google Sheets:', csvString.substring(0, 200) + '...');
    return csvString;
  }

  // SEO and Structured Data
  addStructuredData() {
    // Add Organization structured data
    this.addOrganizationStructuredData();
    
    // Add WebSite structured data
    this.addWebSiteStructuredData();
    
    // Add job posting structured data
    this.addJobStructuredData(this.jobs);
  }

  addOrganizationStructuredData() {
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Jobbyist",
      "url": "https://jobbyist.africa",
      "logo": "https://jobbyist.africa/images/logo.png",
      "description": "Africa's leading job platform connecting talented professionals with top employers across Nigeria and South Africa through automated matching and verified company profiles.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "297 Lucky Bean Crescent",
        "addressLocality": "Pretoria",
        "addressRegion": "GP",
        "postalCode": "1619",
        "addressCountry": "ZA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+27-12-884-5125",
        "email": "info@jobbyist.africa",
        "areaServed": ["ZA", "NG"],
        "availableLanguage": "en"
      },
      "sameAs": [
        "https://linkedin.com/company/jobbyist",
        "https://twitter.com/jobbyist"
      ]
    };

    this.addStructuredDataToPage(organizationData, 'organization-schema');
  }

  addWebSiteStructuredData() {
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Jobbyist",
      "url": "https://jobbyist.africa",
      "description": "Find your dream job in Africa. Connect with top employers across Nigeria and South Africa.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://jobbyist.africa/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    this.addStructuredDataToPage(websiteData, 'website-schema');
  }

  addJobStructuredData(jobs) {
    // Remove existing job structured data
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"][data-schema="job"]');
    existingSchemas.forEach(schema => schema.remove());

    // Add structured data for each job
    jobs.forEach((job, index) => {
      const company = this.companies.find(c => c.name === job.company) || {};
      
      const jobData = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "identifier": {
          "@type": "PropertyValue",
          "name": "Jobbyist Job ID",
          "value": job.id
        },
        "datePosted": job.datePosted,
        "validThrough": job.validThrough,
        "employmentType": job.employmentType.toUpperCase().replace('-', '_'),
        "hiringOrganization": {
          "@type": "Organization",
          "name": job.company,
          "sameAs": company.website || `https://jobbyist.africa/company/${company.slug}`,
          "logo": job.companyLogo
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location.split(',')[0],
            "addressRegion": job.location.split(',')[1]?.trim(),
            "addressCountry": job.country === "South Africa" ? "ZA" : "NG"
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": job.currency,
          "value": {
            "@type": "QuantitativeValue",
            "minValue": job.salaryMin,
            "maxValue": job.salaryMax,
            "unitText": "YEAR"
          }
        },
        "jobBenefits": job.jobBenefits,
        "qualifications": job.qualifications,
        "workFromHome": job.workFromHome,
        "applicantLocationRequirements": {
          "@type": "Country",
          "name": job.country
        },
        "industry": job.industry
      };

      this.addStructuredDataToPage(jobData, `job-${index}`, 'job');
    });
  }

  addStructuredDataToPage(data, id, schemaType = null) {
    // Remove existing schema with same ID
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    if (schemaType) {
      script.setAttribute('data-schema', schemaType);
    }
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  updatePageSEO(page = 'homepage') {
    const seoData = {
      homepage: {
        title: "Jobbyist - Find Your Dream Job in Africa | South Africa & Nigeria Jobs",
        description: "Jobbyist is Africa's leading job platform connecting talented professionals with top employers across Nigeria and South Africa. Find your perfect job today with automated matching and company profiles.",
        keywords: "jobs south africa, jobs nigeria, african jobs, recruitment, careers, jobbyist, johannesburg jobs, lagos jobs, cape town jobs",
        canonical: "https://jobbyist.africa"
      },
      'south-africa-jobs': {
        title: "Jobs in South Africa | Johannesburg, Cape Town, Durban Jobs | Jobbyist",
        description: "Find the best job opportunities in South Africa. Browse jobs in Johannesburg, Cape Town, Durban, and Pretoria. Salaries in ZAR, verified companies.",
        keywords: "south africa jobs, johannesburg jobs, cape town jobs, durban jobs, pretoria jobs, ZAR salary jobs",
        canonical: "https://jobbyist.africa/jobs/south-africa"
      },
      'nigeria-jobs': {
        title: "Jobs in Nigeria | Lagos, Abuja, Port Harcourt Jobs | Jobbyist",
        description: "Discover top job opportunities in Nigeria. Browse jobs in Lagos, Abuja, Port Harcourt, and Kano. Salaries in NGN, verified companies.",
        keywords: "nigeria jobs, lagos jobs, abuja jobs, port harcourt jobs, kano jobs, NGN salary jobs",
        canonical: "https://jobbyist.africa/jobs/nigeria"
      },
      'company-profiles': {
        title: "Company Profiles | Top Employers in Africa | Jobbyist",
        description: "Explore verified company profiles across Africa. Learn about company culture, values, benefits, and open positions from top employers in Nigeria and South Africa.",
        keywords: "company profiles, employers africa, company culture, verified companies, south africa companies, nigeria companies",
        canonical: "https://jobbyist.africa/company-profiles"
      }
    };

    const pageData = seoData[page] || seoData.homepage;

    // Update title
    document.title = pageData.title;

    // Update meta description
    this.updateMetaTag('description', pageData.description);

    // Update meta keywords
    this.updateMetaTag('keywords', pageData.keywords);

    // Update canonical URL
    this.updateCanonicalUrl(pageData.canonical);

    // Update Open Graph tags
    this.updateMetaProperty('og:title', pageData.title);
    this.updateMetaProperty('og:description', pageData.description);
    this.updateMetaProperty('og:url', pageData.canonical);

    // Update Twitter Card tags
    this.updateMetaName('twitter:title', pageData.title);
    this.updateMetaName('twitter:description', pageData.description);
  }

  updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  updateMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  updateMetaName(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  updateCanonicalUrl(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  // Page Management - FIXED
  showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      this.currentPage = pageId;
      
      // Update SEO
      this.updatePageSEO(pageId);
      
      // Update breadcrumb
      this.updateBreadcrumb(pageId);
      
      // Load page-specific content
      this.loadPageContent(pageId);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      console.log('Page loaded successfully:', pageId);
    } else {
      console.error('Page not found:', pageId);
    }
  }

  updateBreadcrumb(pageId) {
    const breadcrumbNav = document.getElementById('breadcrumb-nav');
    const breadcrumb = document.querySelector('.breadcrumb');
    
    if (!breadcrumb) return;

    const breadcrumbData = {
      'homepage': { show: false },
      'south-africa-jobs': {
        show: true,
        items: [
          { text: 'Home', link: '#', onclick: () => this.showPage('homepage') },
          { text: 'Jobs', link: '#' },
          { text: 'South Africa', current: true }
        ]
      },
      'nigeria-jobs': {
        show: true,
        items: [
          { text: 'Home', link: '#', onclick: () => this.showPage('homepage') },
          { text: 'Jobs', link: '#' },
          { text: 'Nigeria', current: true }
        ]
      },
      'company-profiles': {
        show: true,
        items: [
          { text: 'Home', link: '#', onclick: () => this.showPage('homepage') },
          { text: 'Company Profiles', current: true }
        ]
      }
    };

    const data = breadcrumbData[pageId];
    
    if (data && data.show) {
      breadcrumbNav.classList.remove('hidden');
      breadcrumb.innerHTML = data.items.map(item => {
        if (item.current) {
          return `<li class="breadcrumb-current">${item.text}</li>`;
        } else {
          return `<li><a href="${item.link}" ${item.onclick ? `onclick="event.preventDefault(); (${item.onclick.toString()})()"` : ''}>${item.text}</a></li>`;
        }
      }).join('');
    } else {
      breadcrumbNav.classList.add('hidden');
    }
  }

  loadPageContent(pageId) {
    switch (pageId) {
      case 'south-africa-jobs':
        this.loadSouthAfricaJobs();
        break;
      case 'nigeria-jobs':
        this.loadNigeriaJobs();
        break;
      case 'company-profiles':
        this.loadCompanyProfiles();
        break;
      case 'company-detail':
        // Loaded separately when company is selected
        break;
      default:
        // Homepage - already loaded
        break;
    }
  }

  loadSouthAfricaJobs() {
    const saJobs = this.jobs.filter(job => job.country === 'South Africa');
    this.displayCountryJobs(saJobs, 'sa-jobs-container');
    this.setupCityFilters('South Africa');
    this.setupCountrySearch('sa-search-form', 'South Africa');
  }

  loadNigeriaJobs() {
    const ngJobs = this.jobs.filter(job => job.country === 'Nigeria');
    this.displayCountryJobs(ngJobs, 'ng-jobs-container');
    this.setupCityFilters('Nigeria');
    this.setupCountrySearch('ng-search-form', 'Nigeria');
  }

  displayCountryJobs(jobs, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (jobs.length === 0) {
      container.innerHTML = `
        <div class="no-jobs-message" style="text-align: center; padding: var(--space-12); color: var(--text-muted);">
          <h3>No jobs found</h3>
          <p>We're constantly adding new opportunities. Check back soon!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = jobs.map(job => this.renderJobCard(job)).join('');
    
    // Add event listeners to apply buttons - FIXED
    container.removeEventListener('click', this.handleApplyClick);
    container.addEventListener('click', this.handleApplyClick.bind(this));
  }

  handleApplyClick(e) {
    const applyBtn = e.target.closest('.apply-now-btn');
    if (applyBtn) {
      e.preventDefault();
      e.stopPropagation();
      const jobId = applyBtn.getAttribute('data-job-id');
      console.log('Apply button clicked for job:', jobId);
      this.openRegistrationModal(jobId);
    }
  }

  setupCityFilters(country) {
    const cityFilters = document.querySelectorAll('.city-filter');
    
    cityFilters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        // Remove active class from all filters
        cityFilters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        e.target.classList.add('active');
        
        const city = e.target.getAttribute('data-city');
        this.filterJobsByCity(city, country);
      });
    });
  }

  filterJobsByCity(city, country) {
    let filteredJobs = this.jobs.filter(job => job.country === country);
    
    if (city !== 'all') {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    const containerId = country === 'South Africa' ? 'sa-jobs-container' : 'ng-jobs-container';
    this.displayCountryJobs(filteredJobs, containerId);
  }

  setupCountrySearch(formId, country) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const searchParams = {
        keyword: formData.get('keyword')?.toLowerCase() || '',
        industry: formData.get('industry') || '',
        experience: formData.get('experience') || '',
        salaryMin: parseInt(formData.get('salaryMin')) || 0,
        salaryMax: parseInt(formData.get('salaryMax')) || Infinity
      };

      this.filterCountryJobs(searchParams, country);
    });
  }

  filterCountryJobs(params, country) {
    let filteredJobs = this.jobs.filter(job => job.country === country);
    
    // Apply filters
    if (params.keyword) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(params.keyword) ||
        job.company.toLowerCase().includes(params.keyword) ||
        job.description.toLowerCase().includes(params.keyword)
      );
    }
    
    if (params.industry) {
      filteredJobs = filteredJobs.filter(job => job.industry === params.industry);
    }
    
    if (params.salaryMin > 0) {
      filteredJobs = filteredJobs.filter(job => job.salaryMax >= params.salaryMin);
    }
    
    if (params.salaryMax < Infinity) {
      filteredJobs = filteredJobs.filter(job => job.salaryMin <= params.salaryMax);
    }
    
    const containerId = country === 'South Africa' ? 'sa-jobs-container' : 'ng-jobs-container';
    this.displayCountryJobs(filteredJobs, containerId);
  }

  // Company Profiles Management - FIXED
  loadCompanyProfiles() {
    this.displayCompanyProfiles();
    this.setupCompanySearch();
  }

  displayCompanyProfiles() {
    const container = document.getElementById('companies-container');
    if (!container) return;

    const companies = this.filteredCompanies;
    
    container.innerHTML = companies.map(company => `
      <div class="company-card" onclick="jobbyistApp.showCompanyDetail('${company.slug}')">
        <div class="company-header">
          <div class="company-logo">
            <img src="${company.logo}" alt="${company.name} logo" />
          </div>
          <div class="company-info">
            <h3>
              ${company.name}
              ${company.claimed ? '<span class="verified-badge">Verified</span>' : ''}
            </h3>
            <div class="company-meta">${company.industry} • ${company.location}</div>
          </div>
        </div>
        <div class="company-description">
          ${company.description}
        </div>
        <div class="company-stats">
          <span><strong>${company.employees}</strong> employees</span>
          <span><strong>${company.openPositions}</strong> open positions</span>
          <span>Founded <strong>${company.founded}</strong></span>
        </div>
        <div class="company-actions">
          <button class="btn-outline" onclick="event.stopPropagation(); window.open('${company.website}', '_blank')">
            Visit Website
          </button>
          <button class="btn-primary" onclick="event.stopPropagation(); jobbyistApp.showCompanyJobs('${company.name}')">
            View Jobs
          </button>
        </div>
      </div>
    `).join('');
  }

  setupCompanySearch() {
    const form = document.getElementById('company-search-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const searchParams = {
        search: formData.get('companySearch')?.toLowerCase() || '',
        industry: formData.get('industry') || '',
        location: formData.get('location') || ''
      };

      this.filterCompanies(searchParams);
    });
  }

  filterCompanies(params) {
    this.filteredCompanies = this.companies.filter(company => {
      const matchesSearch = !params.search || 
        company.name.toLowerCase().includes(params.search) ||
        company.description.toLowerCase().includes(params.search);
      
      const matchesIndustry = !params.industry || company.industry === params.industry;
      
      const matchesLocation = !params.location || company.country === params.location;

      return matchesSearch && matchesIndustry && matchesLocation;
    });

    this.displayCompanyProfiles();
  }

  showCompanyDetail(companySlug) {
    const company = this.companies.find(c => c.slug === companySlug);
    if (!company) return;

    const container = document.getElementById('company-detail-container');
    if (!container) return;

    // Get company jobs
    const companyJobs = this.jobs.filter(job => job.company === company.name);

    container.innerHTML = `
      <div class="company-detail-header">
        <div class="container">
          <div class="company-detail-hero">
            <div class="company-detail-logo">
              <img src="${company.logo}" alt="${company.name} logo" />
            </div>
            <div class="company-detail-info">
              <h1>
                ${company.name}
                ${company.claimed ? '<span class="verified-badge">Verified</span>' : ''}
              </h1>
              <div class="company-tagline">${company.culture}</div>
              <div class="company-detail-stats">
                <span><strong>${company.employees}</strong> employees</span>
                <span><strong>Founded ${company.founded}</strong></span>
                <span><strong>${company.industry}</strong></span>
                <span><strong>${company.openPositions}</strong> open positions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="company-detail-content">
        <div class="company-main">
          <div class="company-about">
            <h2>About ${company.name}</h2>
            <p>${company.description}</p>
          </div>

          <div class="company-values">
            <h2>Our Values</h2>
            <div class="values-list">
              ${company.values.map(value => `
                <div class="value-item">
                  <h4>${value}</h4>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="company-jobs">
            <h2>Open Positions (${companyJobs.length})</h2>
            <div class="jobs-container">
              ${companyJobs.map(job => this.renderJobCard(job)).join('')}
            </div>
          </div>
        </div>

        <div class="company-sidebar">
          <div class="card">
            <div class="card__body">
              <div class="sidebar-section">
                <h3>Contact Information</h3>
                <div class="contact-info">
                  <span>📧 ${company.contactInfo.email}</span>
                  <span>📞 ${company.contactInfo.phone}</span>
                  <span>📍 ${company.contactInfo.address}</span>
                </div>
                
                <div class="social-links">
                  ${company.socialLinks.linkedin ? `<a href="${company.socialLinks.linkedin}" target="_blank" class="social-link" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>` : ''}
                  ${company.socialLinks.twitter ? `<a href="${company.socialLinks.twitter}" target="_blank" class="social-link" aria-label="Twitter"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>` : ''}
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__body">
              <div class="sidebar-section">
                <h3>Benefits & Perks</h3>
                <ul>
                  ${company.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <button class="btn-primary follow-btn">
            <span>Follow Company</span>
            <div class="btn-ripple"></div>
          </button>
        </div>
      </div>
    `;

    // Show company detail page
    this.showPage('company-detail');

    // Update SEO for company page
    this.updatePageSEO('company-detail');
    document.title = `${company.name} - Company Profile | Jobbyist`;
    this.updateMetaTag('description', `${company.description} Explore ${company.name}'s culture, values, and ${company.openPositions} open positions.`);

    // Add event listeners for job applications - FIXED  
    setTimeout(() => {
      const companyJobsContainer = container.querySelector('.jobs-container');
      if (companyJobsContainer) {
        companyJobsContainer.addEventListener('click', this.handleApplyClick.bind(this));
      }
    }, 100);
  }

  showCompanyJobs(companyName) {
    const companyJobs = this.jobs.filter(job => job.company === companyName);
    
    // Filter homepage jobs to show only this company's jobs
    this.filteredJobs = companyJobs;
    this.displayJobs();
    
    // Go to homepage and scroll to jobs
    this.showPage('homepage');
    setTimeout(() => {
      this.scrollToJobs();
    }, 100);
  }

  // Theme Management
  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  // Event Listeners - FIXED
  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Search form
    const heroSearchForm = document.getElementById('hero-search-form');
    if (heroSearchForm) {
      heroSearchForm.addEventListener('submit', (e) => this.handleSearch(e));
    }

    // View all jobs button
    const viewAllJobsBtn = document.getElementById('view-all-jobs');
    if (viewAllJobsBtn) {
      viewAllJobsBtn.addEventListener('click', () => this.scrollToJobs());
    }

    // Registration modal controls
    this.setupRegistrationModal();

    // Button ripple effects
    this.setupRippleEffects();

    // Dropdown navigation
    this.setupDropdownNavigation();

    // Smooth scrolling for navigation links
    this.setupSmoothScrolling();

    // Keyboard navigation
    this.setupKeyboardNavigation();
  }

  openClaimModal() {
    const modal = document.getElementById('claim-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  // Mobile Menu
  toggleMobileMenu() {
    const navbar = document.querySelector('.navbar-nav');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    if (navbar && toggle) {
      navbar.classList.toggle('mobile-open');
      toggle.classList.toggle('active');
    }
  }

  // Search Functionality - FIXED
  handleSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchParams = {
      title: formData.get('title')?.toLowerCase() || '',
      type: formData.get('type') || '',
      location: formData.get('location') || ''
    };

    console.log('Search params:', searchParams);

    this.filterJobs(searchParams);
    this.displayJobs();
    
    // If not on homepage, go to homepage first
    if (this.currentPage !== 'homepage') {
      this.showPage('homepage');
    }
    
    setTimeout(() => {
      this.scrollToJobs();
      // Show search results feedback
      const resultsCount = this.filteredJobs.length;
      this.showNotification(`Found ${resultsCount} job${resultsCount !== 1 ? 's' : ''} matching your search`, 'success');
    }, 100);
  }

  filterJobs(params) {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesTitle = !params.title || 
        job.title.toLowerCase().includes(params.title) ||
        job.company.toLowerCase().includes(params.title) ||
        job.description.toLowerCase().includes(params.title);
      
      const matchesType = !params.type || job.employmentType === params.type;
      
      const matchesLocation = !params.location || 
        job.location.includes(params.location) ||
        job.country.includes(params.location) ||
        (params.location === 'Remote' && job.location.includes('Remote'));

      return matchesTitle && matchesType && matchesLocation;
    });
  }

  scrollToJobs() {
    const jobsSection = document.querySelector('.job-listings');
    if (jobsSection) {
      jobsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Job Display - FIXED
  displayJobs() {
    const container = document.getElementById('jobs-container');
    if (!container) return;

    const jobsToShow = this.filteredJobs.slice(0, 8);
    
    container.innerHTML = jobsToShow.map(job => this.renderJobCard(job)).join('');

    // Add event listeners to apply buttons - FIXED
    container.removeEventListener('click', this.handleApplyClick);
    container.addEventListener('click', this.handleApplyClick.bind(this));

    // Add animation delay to each card
    const cards = container.querySelectorAll('.job-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  renderJobCard(job) {
    const salaryText = this.formatSalary(job.salaryMin, job.salaryMax, job.currency);
    
    return `
      <div class="job-card fade-in-up" data-job-id="${job.id}">
        <div class="job-header">
          <h3 class="job-title">${job.title}</h3>
          <div class="job-company">${job.company}</div>
        </div>
        <div class="job-meta">
          <span>📍 ${job.location}</span>
          <span>💰 ${salaryText}</span>
          <span>⏰ ${job.employmentType}</span>
          ${job.workFromHome ? '<span>🏠 Remote Options</span>' : ''}
        </div>
        <div class="job-description">
          ${job.description.substring(0, 120)}...
        </div>
        <div class="job-tags">
          <span class="job-tag">Featured</span>
          <span class="job-tag">Posted ${this.getRelativeTime(job.datePosted)}</span>
          ${job.workFromHome ? '<span class="job-tag">Remote Friendly</span>' : ''}
        </div>
        <div style="margin-top: 16px;">
          <button class="btn-primary gradient-glow apply-now-btn" data-job-id="${job.id}" type="button">
            <span>Apply Now</span>
            <div class="btn-ripple"></div>
          </button>
        </div>
      </div>
    `;
  }

  formatSalary(min, max, currency) {
    const formatNumber = (num) => {
      if (currency === 'ZAR') {
        return `R${(num / 1000).toFixed(0)}k`;
      } else {
        return `₦${(num / 1000).toFixed(0)}k`;
      }
    };
    
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  }

  getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  }

  // Registration Modal Management - FIXED
  setupRegistrationModal() {
    // Registration modal controls
    const registrationClose = document.getElementById('registration-close');
    const registrationModal = document.getElementById('registration-modal');

    if (registrationClose) {
      registrationClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeRegistrationModal();
      });
    }

    if (registrationModal) {
      registrationModal.addEventListener('click', (e) => {
        if (e.target === registrationModal || e.target.classList.contains('modal-backdrop')) {
          this.closeRegistrationModal();
        }
      });
    }

    // Registration form navigation
    const nextStepBtn = document.getElementById('next-step');
    const prevStepBtn = document.getElementById('prev-step');
    const submitBtn = document.getElementById('submit-registration');
    const registrationForm = document.getElementById('registration-form');

    if (nextStepBtn) {
      nextStepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.nextStep();
      });
    }
    if (prevStepBtn) {
      prevStepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.prevStep();
      });
    }
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.submitRegistration(e);
      });
    }
    if (registrationForm) {
      registrationForm.addEventListener('input', (e) => this.handleFormInput(e));
      registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitRegistration(e);
      });
    }

    // File upload handlers
    this.setupFileUploads();

    // Apply to job button in success state
    const applyToJobBtn = document.getElementById('apply-to-job');
    if (applyToJobBtn) {
      applyToJobBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.finalizeJobApplication();
      });
    }

    // Claim modal setup
    this.setupClaimModal();
  }

  setupClaimModal() {
    const claimModal = document.getElementById('claim-modal');
    const closeButtons = claimModal?.querySelectorAll('.modal-close');
    
    closeButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        claimModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      });
    });

    claimModal?.addEventListener('click', (e) => {
      if (e.target === claimModal || e.target.classList.contains('modal-backdrop')) {
        claimModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }

  openRegistrationModal(jobId) {
    console.log('Opening registration modal for job ID:', jobId);
    
    this.selectedJob = this.jobs.find(job => job.id === jobId);
    const modal = document.getElementById('registration-modal');
    if (!modal) {
      console.error('Registration modal not found');
      return;
    }

    if (!this.selectedJob) {
      console.error('Job not found:', jobId);
      return;
    }

    // Reset form state
    this.currentStep = 1;
    this.updateProgress();
    this.showStep(1);
    
    // Reset form if needed
    const form = document.getElementById('registration-form');
    if (form) {
      form.reset();
    }

    // Populate form with saved data if available
    this.populateFormData();

    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus management
    setTimeout(() => {
      const firstInput = modal.querySelector('input:not([type="file"]):not([type="checkbox"]):not([type="radio"]), select, textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);

    console.log('Modal opened successfully for job:', this.selectedJob.title);
  }

  closeRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
      this.saveFormData();
      
      // Reset success state if visible
      const form = document.getElementById('registration-form');
      const navigation = document.querySelector('.form-navigation');
      const progressContainer = document.querySelector('.progress-container');
      const successSection = document.getElementById('registration-success');
      
      if (form) form.style.display = 'block';
      if (navigation) navigation.style.display = 'flex';
      if (progressContainer) progressContainer.style.display = 'block';
      if (successSection) successSection.classList.add('hidden');
    }
  }

  // Step Navigation
  nextStep() {
    if (this.validateCurrentStep()) {
      this.saveFormData();
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.updateProgress();
        this.showStep(this.currentStep);
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
      this.showStep(this.currentStep);
    }
  }

  showStep(step) {
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

    if (prevBtn) {
      prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
    }

    if (nextBtn && submitBtn) {
      if (step === this.totalSteps) {
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
  }

  updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
      const percentage = (this.currentStep / this.totalSteps) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  }

  validateCurrentStep() {
    const currentStepEl = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
    if (!currentStepEl) return false;

    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      const value = field.type === 'checkbox' ? field.checked : field.value.trim();
      
      if (!value) {
        field.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    // Additional validation for specific steps
    if (this.currentStep === 1) {
      const emailField = currentStepEl.querySelector('input[type="email"]');
      if (emailField && emailField.value && !this.isValidEmail(emailField.value)) {
        emailField.style.borderColor = '#ef4444';
        isValid = false;
      }

      const resumeInput = currentStepEl.querySelector('input[name="resume"]');
      if (resumeInput && !resumeInput.files.length) {
        const uploadArea = resumeInput.closest('.file-upload-area');
        if (uploadArea) {
          uploadArea.style.borderColor = '#ef4444';
        }
        isValid = false;
      }
    }

    if (!isValid) {
      this.showNotification('Please fill in all required fields correctly.', 'error');
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleFormInput(e) {
    if (e.target.style.borderColor === 'rgb(239, 68, 68)') {
      e.target.style.borderColor = '';
    }

    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => this.saveFormData(), 1000);
  }

  setupFileUploads() {
    const fileUploadAreas = document.querySelectorAll('.file-upload-area');
    
    fileUploadAreas.forEach(area => {
      const fileInput = area.querySelector('.file-input');
      const uploadContent = area.querySelector('.file-upload-content');

      area.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        e.stopPropagation();
        this.handleFileSelect(e.target.files[0], area);
      });

      area.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        area.classList.add('dragover');
      });

      area.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        area.classList.remove('dragover');
      });

      area.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        area.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.handleFileSelect(files[0], area);
        }
      });
    });
  }

  handleFileSelect(file, uploadArea) {
    if (!file) return;

    const fileInput = uploadArea.querySelector('.file-input');
    const uploadContent = uploadArea.querySelector('.file-upload-content');
    const preview = uploadArea.querySelector('.file-preview');
    const isImage = file.type.startsWith('image/');
    const maxSize = isImage ? 5 * 1024 * 1024 : 10 * 1024 * 1024;

    if (file.size > maxSize) {
      this.showNotification(`File size too large. Maximum ${isImage ? '5MB' : '10MB'} allowed.`, 'error');
      return;
    }

    const allowedTypes = isImage ? ['image/jpeg', 'image/jpg', 'image/png'] : 
                        ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      this.showNotification('File type not supported.', 'error');
      return;
    }

    uploadContent.style.display = 'none';
    preview.style.display = 'flex';
    preview.innerHTML = `
      ${isImage ? `<img src="${URL.createObjectURL(file)}" alt="Preview">` : 
        `<div style="width: 40px; height: 40px; background: var(--accent-gradient); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">📄</div>`}
      <div class="file-preview-info">
        <div class="file-preview-name">${file.name}</div>
        <div class="file-preview-size">${this.formatFileSize(file.size)}</div>
      </div>
      <button type="button" class="file-remove" onclick="jobbyistApp.removeFile('${fileInput.name}')">&times;</button>
    `;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;

    uploadArea.style.borderColor = '';
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

  saveFormData() {
    const form = document.getElementById('registration-form');
    if (!form) return;

    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      data[checkbox.name] = checkbox.checked;
    });

    const radios = form.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
      data[radio.name] = radio.value;
    });

    this.formData = data;
    localStorage.setItem('jobbyist_registration_data', JSON.stringify(data));
  }

  loadSavedFormData() {
    const savedData = localStorage.getItem('jobbyist_registration_data');
    if (savedData) {
      try {
        this.formData = JSON.parse(savedData);
      } catch (e) {
        console.error('Error loading saved form data:', e);
        this.formData = {};
      }
    }
  }

  populateFormData() {
    if (!this.formData || Object.keys(this.formData).length === 0) return;

    const form = document.getElementById('registration-form');
    if (!form) return;

    Object.entries(this.formData).forEach(([key, value]) => {
      const field = form.querySelector(`[name="${key}"]`);
      if (field) {
        if (field.type === 'checkbox' || field.type === 'radio') {
          field.checked = value === true || field.value === value;
        } else {
          field.value = value;
        }
      }
    });
  }

  async submitRegistration(e) {
    e.preventDefault();
    
    if (!this.validateCurrentStep()) {
      return;
    }

    const submitBtn = document.getElementById('submit-registration');
    const originalText = submitBtn.querySelector('span').textContent;
    submitBtn.querySelector('span').textContent = 'Creating Account...';
    submitBtn.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.showRegistrationSuccess();
      localStorage.removeItem('jobbyist_registration_data');
      
    } catch (error) {
      this.showNotification('Registration failed. Please try again.', 'error');
      submitBtn.querySelector('span').textContent = originalText;
      submitBtn.disabled = false;
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

    const applyJobText = document.getElementById('apply-job-text');
    if (applyJobText && this.selectedJob) {
      applyJobText.textContent = `Apply to ${this.selectedJob.title} Now`;
    }
  }

  finalizeJobApplication() {
    if (this.selectedJob) {
      window.open(this.selectedJob.applicationUrl, '_blank');
      this.closeRegistrationModal();
      this.showNotification(`Application started for ${this.selectedJob.title}!`, 'success');
    }
  }

  // Utility Methods
  setupRippleEffects() {
    const rippleButtons = document.querySelectorAll('.gradient-glow, .search-btn, .btn-primary');
    
    rippleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = button.querySelector('.btn-ripple');
        if (ripple) {
          ripple.style.width = '0';
          ripple.style.height = '0';
          
          setTimeout(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
          }, 10);
          
          setTimeout(() => {
            ripple.style.width = '0';
            ripple.style.height = '0';
          }, 600);
        }
      });
    });
  }

  setupDropdownNavigation() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (trigger && menu) {
        let timeout;
        
        dropdown.addEventListener('mouseenter', () => {
          clearTimeout(timeout);
          menu.style.opacity = '1';
          menu.style.visibility = 'visible';
          menu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
          timeout = setTimeout(() => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
          }, 150);
        });
      }
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeRegistrationModal();
        document.querySelectorAll('.modal').forEach(modal => {
          modal.classList.add('hidden');
        });
        document.body.style.overflow = 'auto';
      }
    });
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  animateCounters() {
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
            counter.textContent = (Math.floor(current / 1000)) + 'K+';
          } else {
            counter.textContent = Math.floor(current) + (target === 89 ? '%' : '+');
          }
          
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    };

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.feature-card, .section-header');
    elementsToAnimate.forEach(el => observer.observe(el));
  }

  initializeAnimations() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const searchContainer = document.querySelector('.search-container');
      const heroStats = document.querySelector('.hero-stats');
      
      if (heroTitle) heroTitle.classList.add('fade-in-up');
      if (heroSubtitle) {
        setTimeout(() => heroSubtitle.classList.add('fade-in-up'), 200);
      }
      if (searchContainer) {
        setTimeout(() => searchContainer.classList.add('fade-in-up'), 400);
      }
      if (heroStats) {
        setTimeout(() => heroStats.classList.add('fade-in-up'), 600);
      }
    }, 100);
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      box-shadow: var(--shadow-lg);
      z-index: 1100;
      max-width: 400px;
      transform: translateX(100%);
      transition: transform var(--transition-normal);
    `;
    
    if (type === 'success') {
      notification.style.borderColor = 'var(--accent-primary)';
      notification.style.background = 'rgba(37, 99, 235, 0.1)';
    } else if (type === 'error') {
      notification.style.borderColor = '#ef4444';
      notification.style.background = 'rgba(239, 68, 68, 0.1)';
    }
    
    notification.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: var(--font-size-lg); cursor: pointer; color: var(--text-muted); margin-left: var(--space-3);">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize the application
let jobbyistApp;

document.addEventListener('DOMContentLoaded', () => {
  jobbyistApp = new JobbyistApp();
  
  // Add global error handling
  window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
  });
  
  // Add scroll-based navbar styling
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', jobbyistApp.throttle(() => {
    const currentScrollY = window.scrollY;
    
    if (navbar) {
      if (currentScrollY > 50) {
        navbar.style.background = 'rgba(var(--bg-primary-rgb, 255, 255, 255), 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.backdropFilter = 'none';
      }
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollY = currentScrollY;
  }, 100));
  
  window.addEventListener('load', () => {
    document.body.classList.add('fully-loaded');
    
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.style.display = 'none');
  });
  
  window.addEventListener('resize', jobbyistApp.debounce(() => {
    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth < mobileBreakpoint;
    
    if (isMobile) {
      document.body.classList.add('mobile');
    } else {
      document.body.classList.remove('mobile');
      const navbar = document.querySelector('.navbar-nav');
      const toggle = document.getElementById('mobile-menu-toggle');
      if (navbar && toggle) {
        navbar.classList.remove('mobile-open');
        toggle.classList.remove('active');
      }
    }
  }, 250));
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JobbyistApp;
}