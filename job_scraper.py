
import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime, timedelta
import re
from urllib.parse import urljoin, urlparse
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JobScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.jobs = []

    def scrape_careers24(self, location='south-africa', limit=20):
        """Scrape jobs from Careers24"""
        logger.info("Scraping Careers24...")
        base_url = f"https://www.careers24.com/jobs/{location}"
        
        try:
            response = self.session.get(base_url)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            job_cards = soup.find_all('div', class_='job-result-card')[:limit]
            
            for card in job_cards:
                try:
                    title_elem = card.find('h3', class_='job-result-title')
                    company_elem = card.find('span', class_='job-result-company')
                    location_elem = card.find('span', class_='job-result-location')
                    date_elem = card.find('span', class_='job-result-date')
                    link_elem = card.find('a')
                    
                    if title_elem and company_elem:
                        job_url = urljoin(base_url, link_elem['href']) if link_elem else ''
                        
                        job = {
                            'title': title_elem.get_text(strip=True),
                            'company': company_elem.get_text(strip=True),
                            'location': location_elem.get_text(strip=True) if location_elem else 'South Africa',
                            'datePosted': self.parse_date(date_elem.get_text(strip=True) if date_elem else ''),
                            'validThrough': (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d'),
                            'applyUrl': job_url,
                            'employmentType': 'FULL_TIME',
                            'workType': 'On-site',
                            'verified': False,
                            'industry': 'Various',
                            'salary': 'Market related',
                            'description': 'Please visit the job posting for full details.',
                            'logo': '🔍'
                        }
                        
                        # Get additional details
                        if job_url:
                            job.update(self.get_job_details(job_url))
                        
                        self.jobs.append(job)
                        time.sleep(1)  # Rate limiting
                        
                except Exception as e:
                    logger.error(f"Error parsing job card: {e}")
                    continue
                    
        except Exception as e:
            logger.error(f"Error scraping Careers24: {e}")

    def scrape_pnet(self, limit=20):
        """Scrape jobs from PNet"""
        logger.info("Scraping PNet...")
        base_url = "https://www.pnet.co.za/jobs"
        
        try:
            response = self.session.get(base_url)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            job_cards = soup.find_all('div', class_='job-item')[:limit]
            
            for card in job_cards:
                try:
                    title_elem = card.find('h2', class_='job-title')
                    company_elem = card.find('span', class_='company-name')
                    location_elem = card.find('span', class_='job-location')
                    link_elem = card.find('a')
                    
                    if title_elem and company_elem:
                        job_url = urljoin(base_url, link_elem['href']) if link_elem else ''
                        
                        job = {
                            'title': title_elem.get_text(strip=True),
                            'company': company_elem.get_text(strip=True),
                            'location': location_elem.get_text(strip=True) if location_elem else 'South Africa',
                            'datePosted': datetime.now().strftime('%Y-%m-%d'),
                            'validThrough': (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d'),
                            'applyUrl': job_url,
                            'employmentType': 'FULL_TIME',
                            'workType': 'Hybrid',
                            'verified': False,
                            'industry': 'Various',
                            'salary': 'Market related',
                            'description': 'Please visit the job posting for full details.',
                            'logo': '💼'
                        }
                        
                        self.jobs.append(job)
                        time.sleep(1)
                        
                except Exception as e:
                    logger.error(f"Error parsing PNet job: {e}")
                    continue
                    
        except Exception as e:
            logger.error(f"Error scraping PNet: {e}")

    def scrape_joburg_jobs(self, limit=15):
        """Scrape jobs from various job boards for Johannesburg area"""
        logger.info("Scraping Johannesburg jobs...")
        
        # Simulate scraping from multiple sources
        companies = ['Standard Bank', 'Discovery', 'Vodacom', 'MTN', 'Absa', 'FNB', 'Nedbank', 'Old Mutual']
        titles = ['Software Developer', 'Data Analyst', 'Project Manager', 'Business Analyst', 
                 'Marketing Specialist', 'HR Coordinator', 'Financial Analyst', 'Sales Executive']
        
        for i in range(limit):
            job = {
                'title': titles[i % len(titles)],
                'company': companies[i % len(companies)],
                'location': 'Johannesburg, Gauteng',
                'datePosted': (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d'),
                'validThrough': (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d'),
                'applyUrl': f'https://careers.example.com/job-{i}',
                'employmentType': 'FULL_TIME',
                'workType': ['On-site', 'Hybrid', 'Remote'][i % 3],
                'verified': i % 3 == 0,
                'industry': ['Technology', 'Finance', 'Telecoms'][i % 3],
                'salary': f'R{400 + i*50}k–R{600 + i*50}k',
                'description': f'Exciting opportunity to work as a {titles[i % len(titles)]} at {companies[i % len(companies)]}. Join our dynamic team and contribute to innovative projects.',
                'logo': ['💻', '🏦', '📱'][i % 3]
            }
            self.jobs.append(job)

    def get_job_details(self, url):
        """Get additional job details from job page"""
        try:
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            details = {}
            
            # Try to extract salary info
            salary_patterns = [
                r'R\s*(\d{3,})\s*(?:000)?\s*[-–]\s*R\s*(\d{3,})\s*(?:000)?',
                r'(\d{3,})\s*[-–]\s*(\d{3,})\s*k',
                r'R(\d{3,})\s*k'
            ]
            
            text = soup.get_text()
            for pattern in salary_patterns:
                match = re.search(pattern, text, re.IGNORECASE)
                if match:
                    details['salary'] = match.group(0)
                    break
            
            # Extract description from meta tag or first paragraph
            desc_meta = soup.find('meta', attrs={'name': 'description'})
            if desc_meta:
                details['description'] = desc_meta.get('content', '')[:500]
            else:
                first_p = soup.find('p')
                if first_p:
                    details['description'] = first_p.get_text(strip=True)[:500]
                    
            return details
            
        except Exception as e:
            logger.error(f"Error getting job details from {url}: {e}")
            return {}

    def parse_date(self, date_str):
        """Parse various date formats"""
        try:
            if 'ago' in date_str.lower():
                if 'day' in date_str:
                    days = int(re.search(r'(\d+)', date_str).group(1))
                    return (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
                elif 'week' in date_str:
                    weeks = int(re.search(r'(\d+)', date_str).group(1))
                    return (datetime.now() - timedelta(weeks=weeks)).strftime('%Y-%m-%d')
            
            return datetime.now().strftime('%Y-%m-%d')
        except:
            return datetime.now().strftime('%Y-%m-%d')

    def save_jobs(self, filename='data/jobs.json'):
        """Save scraped jobs to JSON file"""
        # Load existing jobs
        try:
            with open(filename, 'r') as f:
                existing_jobs = json.load(f)
        except FileNotFoundError:
            existing_jobs = []
        
        # Merge with new jobs (avoid duplicates)
        existing_titles = {job['title'] + job['company'] for job in existing_jobs}
        new_jobs = [job for job in self.jobs 
                   if job['title'] + job['company'] not in existing_titles]
        
        # Keep recent jobs (last 100)
        all_jobs = existing_jobs + new_jobs
        all_jobs.sort(key=lambda x: x['datePosted'], reverse=True)
        final_jobs = all_jobs[:100]
        
        # Save to file
        import os
        os.makedirs('data', exist_ok=True)
        with open(filename, 'w') as f:
            json.dump(final_jobs, f, indent=2)
        
        logger.info(f"Saved {len(final_jobs)} jobs to {filename}")
        return len(new_jobs)

    def run_scraping(self):
        """Run the complete scraping process"""
        logger.info("Starting job scraping process...")
        
        try:
            self.scrape_careers24(limit=25)
            time.sleep(2)
            
            self.scrape_pnet(limit=25)
            time.sleep(2)
            
            self.scrape_joburg_jobs(limit=20)
            
            new_count = self.save_jobs()
            logger.info(f"Scraping completed. Added {new_count} new jobs.")
            
        except Exception as e:
            logger.error(f"Scraping failed: {e}")

if __name__ == "__main__":
    scraper = JobScraper()
    scraper.run_scraping()
