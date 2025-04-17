# Backend – BioLink

This repository contains the **backend code** for the BioLink web application. It is responsible for serving the frontend, handling API requests, managing the database, and processing uploaded brochure content.

---

## Overview

- This is the **server-side (backend)** of the BioLink app.
- Serves static files from the frontend `/build` folder.
- Handles user authentication, brochure uploads, and other API endpoints.
- Connected to a MySQL database.

---

## Getting Started

### Prerequisites

Ensure the following are installed and properly set up:

- [PHP](https://www.php.net/)
- [MySQL](https://www.mysql.com/)
- (Optional) [phpMyAdmin](https://www.phpmyadmin.net/) for database management
- The frontend production `/build` folder (see [Frontend README](../frontend/README.md))

---

### 1. Place the Frontend Build
After creating the production build from the frontend project:

Copy the /build folder from the frontend

Paste it into the backend project directory

Directory structure should look like:

### 2. Run Production Server 

Start the production server:

```bash
npm start
```

Changes to the /build folder will automatically reload; however changes to the backend code will not automatically reload and will require server restart.

## ⚙️ .env File Configuration
To manage environment-specific variables (like database credentials, email settings, and secret keys), the backend uses a .env file.

### 1. Create a .env File
Create a file named .env in the root of the backend directory:

### 2. Add Required Fields
The .env file must include the following environment variables:

Database Configuration

`DB_HOST`

`DB_PORT`

`DB_USERNAME`

`DB_PASSWORD`

`DB_DATABASE`

Email Server Configuration

`MAIL_HOST`

`MAIL_USER`

`MAIL_PASSWORD`

`MAIL_PORT`

JWT Secret

`JWT_SECRET`

⚠️ Important: Do not share your .env values or commit them to version control. Ensure your .gitignore file includes .env.
