import requests
from bs4 import BeautifulSoup
import json

def scrape_careers24_jobs():
    url = "https://www.careers24.com/jobs/lc-south-africa/"
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    jobs = []
    for job_card in soup.select(".job-card"):
        title = job_card.select_one(".job-title").get_text(strip=True)
        company = job_card.select_one(".job-company").get_text(strip=True)
        location = job_card.select_one(".location").get_text(strip=True)
        link = job_card.select_one("a")["href"]
        jobs.append({
            "title": title,
            "company": company,
            "location": location,
            "link": "https://www.careers24.com" + link,
        })
    with open("../assets/jobs.json", "w") as f:
        json.dump(jobs, f, indent=2)

if __name__ == "__main__":
    scrape_careers24_jobs()
