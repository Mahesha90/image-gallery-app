# Image Rating App

A Node.js web application that allows users to upload images, view them in a gallery, and rate images using a 5-star rating system.

---

## ✨ Features
- User accounts with login/logout
- Upload images
- Gallery view with image ratings
- 5-star rating system
- Organized project structure with separate JS files
- Backend connected to MariaDB using Sequelize ORM

---

## 🛠 Tech Stack
- Node.js
- Express.js
- EJS templating engine
- CSS / HTML for frontend
- MariaDB (database)
- Sequelize ORM
- Git / GitHub for version control

---

## 🚀 Installation
1. Clone the repository and navigate into the folder:
    git clone https://github.com/Mahesha90/image-gallery-app.git
    cd "Student Management App"

2. Install dependencies:
    npm install

3. Set up your `.env` file in the project root with database credentials:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=image_gallery_db

4. Run Sequelize migrations (if using them):
    npx sequelize db:migrate

5. Start the application:
    npm start

6. Open in your browser:  
    http://localhost:3000

---

## 📖 Usage
- Register a new account or login
- Upload images
- Rate images using the 5-star system
- View gallery with average ratings

---

## 📂 Project Structure
    Student Management App/
    ├── models/        # Sequelize models
    ├── routes/        # Express routes
    ├── views/         # EJS templates
    ├── public/        # CSS, JS, images
    ├── app.js         # Main application file
    ├── package.json
    └── README.md

---

## 📜 License
This project is licensed under the **MIT License**.

