import os
import json
from scrapers.indeed import scrape_indeed
from scrapers.careers24 import scrape_careers24
from jinja2 import Environment, FileSystemLoader
from apscheduler.schedulers.blocking import BlockingScheduler
from github_push import commit_and_push

FILTERS = {
    "title": "",
    "company": "",
    "remote": False
}

COUNTRIES = ["za", "ng", "ke", "eg"]

def scrape_all(filters=FILTERS):
    jobs = []
    for cc in COUNTRIES:
        jobs += scrape_indeed(cc, filters)
        jobs += scrape_careers24(cc, filters)
    jobs.sort(key=lambda j: j["datePosted"], reverse=True)
    return jobs

def save_html(jobs, filters=FILTERS):
    env = Environment(loader=FileSystemLoader('templates'))
    tmpl = env.get_template('jobs.html.j2')
    html = tmpl.render(jobs=jobs, filters=filters)
    with open('jobs.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == "__main__":
    jobs = scrape_all()
    save_html(jobs)
    commit_and_push('jobs.html', 'Auto-update job listings')
