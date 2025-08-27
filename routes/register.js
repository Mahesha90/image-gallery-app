const express = require("express");
const bcrypt = require("bcrypt");
//const pool = require("../db");
const router = express.Router();
const { User } = require("../models"); // ✅ Sequelize model


// GET registration form
router.get("/register", (req, res) => {
  res.render("register");
});

// POST registration form
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // ✅ Password validation
  const passwordErrors = [];
  if (password.length < 8) {
    passwordErrors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    passwordErrors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    passwordErrors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    passwordErrors.push("Password must contain at least one number.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    passwordErrors.push("Password must contain at least one special character.");
  }

  if (passwordErrors.length > 0) {
    return res.render("register", {
      error: passwordErrors.join(" "),
      username,
    });
  }


  try {
   const hashedPassword = await bcrypt.hash(password, 10);
    //const conn = await pool.getConnection();
    //await conn.query("INSERT INTO users (username, password) VALUES (?, ?)", [
    //  username,
    //  hashedPassword,
   // ]);
    //conn.release();

    await User.create({ username, password: hashedPassword });


    res.redirect("/login");
  } catch (err) {
    console.error("Registration error:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.render("register", {
        error: "Username already exists. Please choose another.",
        username, // preserve username
      });
    }

    res.render("register", {
      error: "Registration failed. Please try again.",
      username, // preserve username
    });
  }
});

module.exports = router;
