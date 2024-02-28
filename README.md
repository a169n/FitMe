# FitMe

## Overview
This project is a full-stack web application developed using React for the frontend and Node.js for the backend. It serves as a management system for various entities including users, restaurants, foods, categories, exercises, and recipes. The application features user authentication, admin privileges management, and CRUD operations for managing data related to different entities.

## Admin access:
* username: admin
* password: admin

## Features
### User Authentication
- Users can register with unique usernames and emails.
- Registered users can log in securely using their credentials.
- User sessions are managed using JSON Web Tokens (JWT) for authentication.

### User Management
- Admin users have access to user management functionalities.
- Admins can view, create, update, and delete user accounts.
- Admins can grant or revoke admin privileges for other users.

### Restaurant Management
- Admin users can manage restaurant data, including name, image, keywords, region, and description.
- CRUD operations are available for restaurants, allowing admins to create, read, update, and delete restaurant entries.

### Food Management
- Admin users have control over food items stored in the application.
- Foods can be created, read, updated, and deleted by admins.
- Each food entry includes details such as name, image, category, price, and description.

### Category Management
- Admin users can manage categories for foods and restaurants.
- Categories can be added, edited, and deleted to organize data efficiently.

### External APIs Integration
- The application integrates with external APIs to fetch data related to exercises and recipes.
- Users can access exercises and recipes from external sources directly within the application.

### Internationalization (i18n)
- The application supports multiple languages using the i18next library.
- Users can switch between different languages to customize their experience.

## Installation
1. Clone the repository: `git clone https://github.com/a169n/FitMe.git`
2. Navigate to the project directory: `cd <project_directory>`
3. Install dependencies:
   - Root: `npm install`
   - Server: `cd server && npm install`
   - Client: `cd ../client && npm install`

## Usage
1. Start the development server: `npm start`
   - This command concurrently starts the backend and frontend servers.
2. Open your browser and go to `http://localhost:5173` to access the application.

## Folder Structure
- `src/components`: Contains reusable React components used throughout the application.
- `src/hooks`: Contains custom React hooks for managing state and side effects.
- `src/pages`: Contains page components corresponding to different routes in the application.
- `src/redux`: Contains Redux-related files including reducers, actions, and API services.
- `src/assets`: Contains static assets such as images and icons.
  
## Dependencies
### Client
- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: Library for routing in React applications.
- **Redux Toolkit**: Toolkit for efficient Redux development.
- **React Redux**: Official Redux bindings for React.
- **i18next**: Internationalization library for React.
- **@vitejs/plugin-react**: Vite plugin for React support.
- **ESLint**: JavaScript linter for identifying and reporting on patterns in JavaScript code.
- **eslint-plugin-react**: ESLint plugin for React-specific linting rules.
- **eslint-plugin-react-hooks**: ESLint plugin for React hooks-specific linting rules.

### Server
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for user authentication.
- **dotenv**: Module for loading environment variables from a .env file.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- **multer**: Middleware for handling multipart/form-data, primarily used for file uploads.
- **nodemon**: Utility that monitors for changes in files and automatically restarts the server.

### Root
- **concurrently**: Utility for running multiple commands concurrently.

## License
This project is NOT licensed yet.
