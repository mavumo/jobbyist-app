import os
from github import Github

def commit_and_push(file_path, message):
    token = os.getenv("GITHUB_TOKEN")
    g = Github(token)
    repo = g.get_repo("mavumo/jobbyist-africa")
    try:
        contents = repo.get_contents("jobs.html", ref="gh-pages")
        repo.update_file(contents.path, message, open(file_path,'r').read(), contents.sha, branch="gh-pages")
    except:
        repo.create_file("jobs.html", message, open(file_path,'r').read(), branch="gh-pages")
