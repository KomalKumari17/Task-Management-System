# Task Management System

This repository contains a Task Management Application built with Django (backend), React (frontend), and PostgreSQL. The application includes features for user authentication, task management, and a frontend interface that communicates with the backend via REST APIs.


## Project Structure

- **Backend (Django)**:
  - Handles API endpoints for user management and task management.
  - Uses JWT Authentication for securing endpoints.
  - Data is stored in PostgreSQL.

- **Frontend (React)**:
  - Provides user interfaces for registration, login, and task management.

---

## Prerequisites

- Python 3.8 or higher
- Node.js and npm
- PostgreSQL
- Virtual environment tool (e.g., `virtualenv` or `venv`)

---

## Backend Setup (Django)

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>

**2. Set up the virtual environment:**
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

**3. Install dependencies:**
pip install -r requirements.txt

**4. Run database migrations:**
python manage.py makemigrations
python manage.py migrate

**5. Create a superuser:**
python manage.py createsuperuser

**6. Run the Django development server:**
python manage.py runserver

**1. Frontend Setup (React)**
Navigate to the frontend directory:
cd taskfront

**2. Install Node.js dependencies:**
npm install

**3. Combined Deployment**
Ensure the backend (Django) and frontend (React) are running on different ports:

Backend: http://localhost:8000
Frontend: http://localhost:3000

**Run the backend server:**
python manage.py runserver

**Start the frontend server:**
npm run dev