
from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# User data storage (in production, use a proper database)
USERS_FILE = 'data/users.json'

def load_users():
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_users(users):
    os.makedirs('data', exist_ok=True)
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

def get_user_from_headers():
    """Extract user info from Repl Auth headers"""
    user_id = request.headers.get('X-Replit-User-Id')
    user_name = request.headers.get('X-Replit-User-Name')
    user_roles = request.headers.get('X-Replit-User-Roles', '')
    
    if user_id and user_name:
        return {
            'id': user_id,
            'name': user_name,
            'roles': user_roles.split(',') if user_roles else []
        }
    return None

@app.route('/api/auth/status')
def auth_status():
    user = get_user_from_headers()
    if user:
        # Save/update user in our system
        users = load_users()
        if user['id'] not in users:
            users[user['id']] = {
                'name': user['name'],
                'email': '',
                'joined': datetime.now().isoformat(),
                'saved_jobs': [],
                'applications': [],
                'profile_complete': False
            }
            save_users(users)
        
        session['user_id'] = user['id']
        return jsonify({'authenticated': True, 'user': user})
    
    return jsonify({'authenticated': False})

@app.route('/api/auth/logout')
def logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/user/profile', methods=['GET', 'POST'])
def user_profile():
    user = get_user_from_headers()
    if not user:
        return jsonify({'error': 'Not authenticated'}), 401
    
    users = load_users()
    user_data = users.get(user['id'], {})
    
    if request.method == 'POST':
        # Update user profile
        profile_data = request.get_json()
        user_data.update(profile_data)
        user_data['profile_complete'] = True
        users[user['id']] = user_data
        save_users(users)
        return jsonify({'success': True, 'user': user_data})
    
    return jsonify({'user': user_data})

@app.route('/api/jobs/save', methods=['POST'])
def save_job():
    user = get_user_from_headers()
    if not user:
        return jsonify({'error': 'Not authenticated'}), 401
    
    job_id = request.get_json().get('job_id')
    users = load_users()
    user_data = users.get(user['id'], {})
    
    if 'saved_jobs' not in user_data:
        user_data['saved_jobs'] = []
    
    if job_id not in user_data['saved_jobs']:
        user_data['saved_jobs'].append(job_id)
        users[user['id']] = user_data
        save_users(users)
    
    return jsonify({'success': True})

@app.route('/api/jobs/unsave', methods=['POST'])
def unsave_job():
    user = get_user_from_headers()
    if not user:
        return jsonify({'error': 'Not authenticated'}), 401
    
    job_id = request.get_json().get('job_id')
    users = load_users()
    user_data = users.get(user['id'], {})
    
    if 'saved_jobs' in user_data and job_id in user_data['saved_jobs']:
        user_data['saved_jobs'].remove(job_id)
        users[user['id']] = user_data
        save_users(users)
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
