import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

def scrape_careers24(country_code, filters):
    cc = country_code.lower()
    url = f"https://www.careers24.com/jobs/lc-{cc}/"
    resp = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    jobs = []
    for card in soup.select(".jobDetailsHolder")[:20]:
        title = card.select_one(".jobTitle").text.strip()
        company = card.select_one(".companyName").text.strip()
        location = card.select_one(".location").text.strip()
        link = "https://www.careers24.com" + card.select_one("a")['href']
        desc = card.select_one(".jobDescription").text.strip()
        datestring = card.select_one(".jobDate").text.strip()
        date_posted = parse_date(datestring)

        remote = 'remote' in (title + desc).lower() or filters['remote'] and True

        if filters['company'] and filters['company'].lower() not in company.lower(): continue

        jobs.append({
            "source": "Careers24",
            "title": title,
            "company": company,
            "location": {"text": location, "country": country_code.upper()},
            "remote": remote,
            "datePosted": date_posted.isoformat(),
            "validThrough": (date_posted + timedelta(days=30)).isoformat(),
            "employmentType": "",
            "description": desc,
            "baseSalary": {},
            "identifier": {"name": company, "value": link},
            "industry": "",
            "link": link
        })
    return jobs

def parse_date(ds):
    try:
        return datetime.strptime(ds, "%d %b %Y")
    except:
        return datetime.utcnow()
