
#!/usr/bin/env python3
"""
Daily Job Update Service for Jobbyist
Runs daily to scrape and update job listings
"""

import schedule
import time
import logging
from datetime import datetime
from job_scraper import JobScraper
import json
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/job_updates.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class DailyJobUpdater:
    def __init__(self):
        self.scraper = JobScraper()
        os.makedirs('logs', exist_ok=True)
        
    def update_jobs(self):
        """Main job update function"""
        logger.info("Starting daily job update...")
        
        try:
            # Run job scraping
            old_count = self.get_current_job_count()
            self.scraper.run_scraping()
            new_count = self.get_current_job_count()
            
            # Log results
            added_jobs = new_count - old_count
            logger.info(f"Job update completed. Added {added_jobs} new jobs. Total: {new_count}")
            
            # Update metadata
            self.update_metadata(added_jobs)
            
            return True
            
        except Exception as e:
            logger.error(f"Job update failed: {e}")
            return False
    
    def get_current_job_count(self):
        """Get current number of jobs"""
        try:
            with open('data/jobs.json', 'r') as f:
                jobs = json.load(f)
                return len(jobs)
        except FileNotFoundError:
            return 0
    
    def update_metadata(self, added_jobs):
        """Update job metadata"""
        metadata = {
            'last_update': datetime.now().isoformat(),
            'jobs_added_today': added_jobs,
            'total_jobs': self.get_current_job_count(),
            'sources': ['Careers24', 'PNet', 'Direct Scraping']
        }
        
        with open('data/job_metadata.json', 'w') as f:
            json.dump(metadata, f, indent=2)

def run_scheduler():
    """Run the job scheduler"""
    updater = DailyJobUpdater()
    
    # Schedule daily updates at 6 AM
    schedule.every().day.at("06:00").do(updater.update_jobs)
    
    # Schedule additional updates every 6 hours
    schedule.every(6).hours.do(updater.update_jobs)
    
    logger.info("Job scheduler started. Next update scheduled.")
    
    # Run immediately on start
    updater.update_jobs()
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    run_scheduler()
