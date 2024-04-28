# FitMe

## Overview
FitMe is a full-stack web application developed using React for the frontend and Node.js for the backend. It serves as a management system for various entities including users, restaurants, foods, categories, exercises, and recipes. The application features user authentication, admin privileges management, and CRUD operations for managing data related to different entities.

## Admin access:
* **Username:** admin
* **Password:** admin

## Deployment:
* Deployed address:
```
no deployed address :(
```

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

## Features
- **User Authentication:** Register, log in, and manage user accounts securely.
- **User Management:** Admins can manage user accounts, grant/revoke admin privileges.
- **Restaurant Management:** CRUD operations for managing restaurant data including name, image, keywords, region, and description.
- **Food Management:** Create, read, update, and delete food items with details such as name, image, category, price, and description.
- **Global Category and Category Management:** Add, edit, and delete categories for foods and restaurants to organize data efficiently.
- **External APIs Integration:** Fetch exercises and recipes data from external APIs, allowing users to access additional content directly within the application.
- **Nodemailer:** Email notification on login and registration.
- **Multer:** Upload and delete images that is stored in backend.

## Folder Structure
- `src/components`: Reusable React components.
- `src/hooks`: Custom React hooks for managing state and side effects.
- `src/pages`: Page components for different routes.
- `src/redux`: Redux-related files including reducers, actions, and API services.
- `src/assets`: Static assets such as images and icons.

## Dependencies
### Client
- **React**
- **React Router DOM**
- **Redux Toolkit**
- **React Redux**
- **i18next**
- **@vitejs/plugin-react**
- **ESLint**
- **eslint-plugin-react**
- **eslint-plugin-react-hooks**

### Server
- **Express**
- **MongoDB**
- **Mongoose**
- **bcrypt**
- **jsonwebtoken**
- **dotenv**
- **cors**
- **multer**
- **nodemon**


### Root
- **concurrently**

## License
This project is NOT licensed yet.
