import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

def scrape_indeed(country_code, filters):
    url = f"https://{country_code}.indeed.com/jobs?q={filters['title']}&l="
    resp = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    jobs = []
    for card in soup.find_all("div", class_="jobsearch-SerpJobCard"):
        title = card.find("a", class_="jobtitle").text.strip()
        company = card.find("span", class_="company").text.strip()
        loc = card.find("div", class_="location") or card.find("span", class_="location")
        location = loc.text.strip() if loc else ""
        link = "https://indeed.com" + card.find("a", class_="jobtitle")['href']
        summary = card.find("div", class_="summary").text.strip()
        datestring = card.find("span", class_="date").text.strip()
        date_posted = parse_date(datestring)

        remote = 'remote' in (title + summary).lower() or filters['remote'] and True

        if filters['company'] and filters['company'].lower() not in company.lower(): continue

        jobs.append({
            "source": "Indeed",
            "title": title,
            "company": company,
            "location": {"text": location, "country": country_code.upper()},
            "remote": remote,
            "datePosted": date_posted.isoformat(),
            "validThrough": (date_posted + timedelta(days=30)).isoformat(),
            "employmentType": summary.split()[0],
            "description": summary,
            "baseSalary": {},
            "identifier": {"name": company, "value": link},
            "industry": "",
            "link": link
        })
    return jobs

def parse_date(ds):
    if "just" in ds or "today" in ds:
        return datetime.utcnow()
    if "30+" in ds or "30" in ds:
        return datetime.utcnow() - timedelta(days=30)
    n = int(''.join(filter(str.isdigit, ds)))
    if "day" in ds:
        return datetime.utcnow() - timedelta(days=n)
    if "hour" in ds:
        return datetime.utcnow() - timedelta(hours=n)
    return datetime.utcnow()
