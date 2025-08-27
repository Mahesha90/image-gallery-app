// routes/ratings.js
const express = require("express");
const router = express.Router();
//const pool = require("../db"); // Adjust path as needed
const { Rating } = require("../models"); // Sequelize model
const requireLogin = require("../middleware/requireLogin");

router.post("/rate", requireLogin, async (req, res) => {
  const { image_id, rating } = req.body;
  const user_id = req.session.user.id;

  try {
    //const conn = await pool.getConnection();

    // Either insert or update rating
   // await conn.query(
    //  `INSERT INTO ratings (image_id, user_id, rating)
    //   VALUES (?, ?, ?)
    //   ON DUPLICATE KEY UPDATE rating = ?`,
    //  [image_id, user_id, rating, rating]
    //);

    //conn.release();
    //res.redirect("/");
  //} catch (err) {
  //  console.error("Rating error:", err);
   // res.send("Error submitting rating");
  //}
//});

 // Sequelize "upsert" will insert or update automatically
    await Rating.upsert({
      image_id,
      user_id,
      rating
    });

    res.redirect("/");
  } catch (err) {
    console.error("Rating error:", err);
    res.send("Error submitting rating");
  }
});

module.exports = router;
