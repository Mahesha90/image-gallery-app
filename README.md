# Image Rating App

A Node.js web application that allows users to upload images, view them in a gallery, and rate images using a 5-star rating system.

## Features

- User accounts with login/logout
- Upload images
- Gallery view with image ratings
- 5-star rating system
- Organized project structure with separate JS files
- Backend connected to MariaDB using Sequelize ORM

## Tech Stack

- Node.js
- Express.js
- EJS for templating
- CSS/HTML for styling
- MariaDB (database)
- Sequelize ORM
- Git/GitHub for version control

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Mahesha90/image-gallery-app.git
Navigate into the project folder:

bash
Copy code
cd "Student Management App"
Install dependencies:

bash
Copy code
npm install
Set up your .env file with database credentials:

ini
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=image_gallery_db
Start the application:

bash
Copy code
npm start
Open your browser and go to:

arduino
Copy code
http://localhost:3000
Usage
Register a new account or login

Upload images

Rate images using the star system

View gallery with average ratings

Project Structure
csharp
Copy code
Student Management App/
├── models/        # Sequelize models
├── routes/        # Express routes
├── views/         # EJS templates
├── public/        # CSS, JS, images
├── app.js         # Main application file
├── package.json
└── README.md
