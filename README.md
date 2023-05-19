# Eqeuvu Assessment

This is a simple HR system to receive applications from candidates.

## Prerequisites

- Docker
- Node.js
- Python

## Backend Setup

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend directory: `cd backend`
3. Create a virtual environment: `python -m venv env`
4. Activate the virtual environment:
   - On Windows: `env\Scripts\activate`
   - On macOS/Linux: `source env/bin/activate`
5. Install the dependencies: `pip install -r requirements.txt`
6. Set up the database:
   - Make sure Docker is running
   - Run the following command: `docker-compose up -d`
7. Apply the database migrations: `python manage.py migrate`
8. Create a superuser: `python manage.py createsuperuser`
9. Start the backend server: `python manage.py runserver`
10. Open browser and go to: http://127.0.0.1:8000/api/

## Frontend Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install the dependencies: `npm install`

## Running the Application

1. Start the frontend development server: `npm start`
2. Access the application in your browser at: `http://localhost:3000`

## Docker Deployment

1. Build the Docker images: `docker-compose build`
2. Start the Docker containers: `docker-compose up`

The application should now be up and running at `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend API.

## Additional Notes

- The backend API endpoints are available at `/api/`.
- Admin authentication is required to access certain endpoints. Set the `X-ADMIN` header to `1` in the request to authenticate as an admin user.
- The database container is using PostgreSQL and is set up automatically with Docker Compose.
- To stop the Docker containers, run: `docker-compose down`
- Remember to deactivate the virtual environment when you're done: `deactivate` (Windows) or `deactivate` (macOS/Linux)
