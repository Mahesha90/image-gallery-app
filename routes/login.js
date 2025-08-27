const express = require("express");
const bcrypt = require("bcrypt");
//const pool = require("../db");
const { User } = require("../models"); // ✅ Sequelize model
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");



router.get("/login", (req, res) => {
  res.render("login", { error: null, username: "" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username);

  try {
    //const conn = await pool.getConnection();
    //const result = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
    //conn.release();

    // Normalize result to an array of rows
    //const rows = Array.isArray(result) ? result : [result];
    //const user = rows[0];

    const user = await User.findOne({ where: { username } });


    //console.log("DB rows length:", Array.isArray(rows) ? rows.length : "n/a");
    //console.log("User extracted:", user);

    if (!user || !user.password) {
      console.log("Invalid username or missing password in DB");
      return res.render("login", { error: "Invalid username or password.", username });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("Password match:", match);

    if (!match) {
      return res.render("login", { error: "Invalid username or password.", username });
    }

    req.session.user = { id: user.id, username: user.username };
    return res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    return res.render("login", { error: "Something went wrong.", username });
  }
});

module.exports = router;
