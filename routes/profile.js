const express = require("express");
//const pool = require("../db");
const router = express.Router();
const { Profile } = require("../models"); // ✅ Sequelize model

// Middleware to protect route
function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}


// Show profile form (prefilled if data exists)
router.get("/profile", requireLogin, async (req, res) => {
  const userId = req.session.user.id;
  const isEditing = req.query.edit === "1"; // true if edit mode

  try {
   // const conn = await pool.getConnection();
   // const rows = await conn.query(
    //  "SELECT email, birthday, address FROM profiles WHERE user_id = ?",
    //  [userId]
    //);
    const profile = await Profile.findOne({ where: { user_id: userId } });
    //conn.release();

    //const profile = rows && rows.length ? rows[0] : null;
    if (profile && profile.birthday) {
  // Try converting birthday to Date if it's a string
  const bday = profile.birthday instanceof Date
    ? profile.birthday
    : new Date(profile.birthday);

  if (!isNaN(bday)) { // Valid date check
    const yyyy = bday.getFullYear();
    const mm = String(bday.getMonth() + 1).padStart(2, '0');
    const dd = String(bday.getDate()).padStart(2, '0');
    profile.birthday = `${yyyy}-${mm}-${dd}`;
  }
}


    res.render("profile", { profile, isEditing });
  } catch (err) {
    console.error("Error loading profile:", err);
    res.send("Error loading profile");
  }
});


// Create or update profile
router.post("/profile", requireLogin, async (req, res) => {
  const { email, birthday, address } = req.body;
  const userId = req.session.user.id;

  try {
    //const conn = await pool.getConnection();

    // Check if profile exists
   // const existing = await conn.query(
    //  "SELECT email, birthday, address FROM profiles WHERE user_id = ?",
    //  [userId]
    //);
    const [profile, created] = await Profile.findOrCreate({
      where: { user_id: userId },
      defaults: { email, birthday, address }
    });

    //if (existing.length) {
      // Only update fields if changed
      //const current = existing[0];
      //await conn.query(
      //  "UPDATE profiles SET email = ?, birthday = ?, address = ? WHERE user_id = ?",
      //  [
       //   email || current.email,
       //   birthday || current.birthday,
       //   address || current.address,
       //   userId
       // ]
     // );
    //} else {
     // await conn.query(
     //   "INSERT INTO profiles (user_id, email, birthday, address) VALUES (?, ?, ?, ?)",
     //   [userId, email, birthday, address]
     // );
    //}

   // conn.release();
   // res.redirect("/profile");
  //} catch (err) {
   // console.error("Profile save error:", err);
   // res.send("Error saving profile");
  //}
//});

if (!created) {
      // If already exists, update only changed fields
      profile.email = email || profile.email;
      profile.birthday = birthday || profile.birthday;
      profile.address = address || profile.address;
      await profile.save();
    }

    res.redirect("/profile");
  } catch (err) {
    console.error("Profile save error:", err);
    res.send("Error saving profile");
  }
});

module.exports = router;
