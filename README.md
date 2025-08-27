# Image Rating App

A Node.js web application that allows users to upload images, view them in a gallery, and rate images using a 5-star rating system.

---

## Features
- User accounts with login/logout  
- Upload images  
- Gallery view with image ratings  
- 5-star rating system  
- Organized project structure with separate JS files  
- Backend connected to MariaDB using Sequelize ORM  

---

## Tech Stack
- Node.js  
- Express.js  
- EJS templating engine  
- CSS / HTML for frontend  
- MariaDB (database)  
- Sequelize ORM  
- Git / GitHub for version control  

---

## Installation
1. Clone the repository and enter the folder:  
    git clone https://github.com/Mahesha90/image-gallery-app.git  
    cd image-gallery-app  

2. Install dependencies:  
    npm install  

3. Create a `.env` file in the project root with your database credentials:  
    DB_HOST=localhost  
    DB_PORT=3306  
    DB_USER=root  
    DB_PASSWORD=yourpassword  
    DB_NAME=image_gallery_db  
    PORT=3000  

4. Create the database in MariaDB (once):  
    mysql -u root -p  
    CREATE DATABASE image_gallery_db;  
    EXIT;  

5. Run Sequelize migrations:  
    npx sequelize db:migrate  

6. Start the application:  
    npm start  
    # or  
    node app.js  

7. Open in your browser:  
    http://localhost:3000  

---

## Usage
- Register a new account or login  
- Upload images  
- Rate images using the 5-star system  
- View gallery with average ratings  

---

## Project Structure
    image-gallery-app/
    ├── models/        # Sequelize models
    ├── migrations/    # Sequelize migrations
    ├── routes/        # Express routes
    ├── views/         # EJS templates
    ├── public/        # CSS, JS, images
    ├── app.js         # Main application file
    ├── package.json
    └── README.md  

---
