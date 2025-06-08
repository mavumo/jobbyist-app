import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrape_careers24_jobs():
    url = "https://www.careers24.com/jobs/lc-south-africa/kw-legal/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    jobs = []
    for job_card in soup.select(".jobList li.jobItem"):
        try:
            title = job_card.select_one(".jobTitle a").text.strip()
            company = job_card.select_one(".recruiter").text.strip()
            location = job_card.select_one(".location").text.strip()
            job_url = "https://www.careers24.com" + job_card.select_one(".jobTitle a")["href"]

            jobs.append({
                "title": title,
                "company": company,
                "location": location,
                "url": job_url,
                "posted": datetime.utcnow().isoformat()
            })
        except Exception as e:
            print(f"Failed to parse job card: {e}")
            continue

    return jobs

def scrape_jobs():
    all_jobs = scrape_careers24_jobs()

    with open("jobs/jobs.json", "w") as f:
        json.dump(all_jobs, f, indent=2)

if __name__ == "__main__":
    scrape_jobs()
