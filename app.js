const express = require("express");
const session = require("express-session");

// Route modules
const db = require('./models'); // Sequelize models and connection

const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const registerRoutes = require("./routes/register");
const profileRoutes = require("./routes/profile");
const galleryRoutes = require("./routes/gallery");
const ratingRoutes = require("./routes/ratings");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

// Static + body parser BEFORE session is okay, but session must be before routes
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key', // TODO: replace with a strong secret in prod
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

// Mount routes
app.use("/", loginRoutes);
app.use("/", logoutRoutes);
app.use("/", registerRoutes);
app.use("/", profileRoutes);
app.use("/", galleryRoutes);
app.use(ratingRoutes);

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synchronized (altered)');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })

  //after finishing the development change to this code
  //db.sequelize.sync()
//  .then(() => {
  //  console.log('✅ Database synchronized');
   // app.listen(PORT, () => {
   //   console.log(`Server running on http://localhost:${PORT}`);
   // });
  //})
  //.catch(err => {
  //  console.error('Error syncing database:', err);
  //});




//app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
