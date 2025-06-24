def scrape_indeed(country_code, filters):
    # fetch & parse...
    jobs = []
    for card in ...:
        # extract title, company, location, link, posted_date, summary...
        # Apply filters:
        if filters['title'] not in title.lower(): continue
        # ...
        jobs.append({
            'source': 'Indeed',
            'title': title,
            'company': company,
            'location': { ... },
            'remote': is_remote,
            'datePosted': posted_date,
            'validThrough': compute_valid_through(posted_date),
            'employmentType': employment,
            'description': summary,
            'baseSalary': salary_info,
            'identifier': { 'name': company, 'value': unique_id },
            'industry': industry,
            'link': link
        })
    return jobs
