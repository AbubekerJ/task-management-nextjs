# Task Management System

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [Running the Application Locally](#running-the-application-locally)
  - [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
  - [Accessing Swagger UI](#accessing-swagger-ui)

## Project Description
The Task Management System is a web application that allows users to create, update, delete and assign user and manage tasks. Users can assign tasks to other users and filter tasks based on their status (completed or pending).

## Features
- User authentication (register, sign-in, sign-out)
- Task creation, update, and deletion
- Task assignment to users
- Filtering tasks by status (completed/pending)
- Sorting tasks by creation date (latest/oldest)
- Responsive design

## Technologies Used
- Backend: Node.js, Express.js, PostgreSQL
- Frontend: Next.js, React.js, Tailwind CSS
- Authentication: JWT (JSON Web Tokens)
- Documentation: Swagger

## Project Setup

### Prerequisites
- Node.js (v14 or later)
- PostgreSQL
- Git

### Installation

1. **Clone the repository:**
    
    git clone https://github.com/AbubekerJ/task-management-nextjs.git
    cd task-management-system
    

2. **Backend Setup:**

    - Install backend dependencies in root folder:
  
      npm install
   

    - Create a `.env` file and add your environment variables :
    

      Update the environment variables in `.env` as needed.

    - Start the backend server:
    
      npm star
      

3. **Frontend Setup:**

    - Navigate to the frontend directory:

      cd ../client


    - Install frontend dependencies:
     
      npm install
      

    - Start the frontend development server:
  
      npm run dev
 

## Usage

### Running the Application Locally

1. **Backend:**
    - Ensure PostgreSQL is running.
    - Run the backend server using:
      
      npm start
     

2. **Frontend:**
    - Run the frontend development server using:
  
      npm run dev


3. **Access the application:**
    - Open your browser and navigate to `http://localhost:3000`.

### API Endpoints
- **Register User:** `POST /api/register`
- **Sign In User:** `POST /api/signin`
- **Sign Out User:** `GET /api/signout`
- **Create Task:** `POST /api/createtask`
- **Delete Task:** `DELETE /api/deleteTask/:Taskid`
- **Update Task:** `PUT /api/updateTask/:Taskid`
- **Get User Tasks:** `GET /api/getUserTasks`

## API Documentation

API documentation is available at `/api-docs` using Swagger UI.

### Accessing Swagger UI

- For local environment: `http://localhost:3001/api-docs`

 -For production: `https://<your backend api url>/api-docs`

