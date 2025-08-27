const express = require("express");
const multer = require("multer");
const path = require("path");
//const pool = require("../db");
const { Op, fn, col } = require("sequelize");
const { Image, Rating, User } = require("../models"); // ✅ Sequelize model
const fs = require('fs');


const router = express.Router();

// Middleware to require login
function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Homepage gallery route (filter by public/private)
router.get("/", requireLogin, async (req, res) => {
  try {
    //const conn = await pool.getConnection();

  //const images = await conn.query(`
  //SELECT i.*, 
  //       AVG(r.rating) AS avg_rating, 
   //      (SELECT rating FROM ratings WHERE image_id = i.id AND user_id = ?) AS user_rating
  //FROM images i
  //LEFT JOIN ratings r ON i.id = r.image_id
  //WHERE i.visibility = 'public' OR i.user_id = ?
  //GROUP BY i.id
//`, [req.session.user.id, req.session.user.id]);

//    conn.release();

//    res.render("index", {
//      images,
//      user: req.session.user
//    });
//  } catch (err) {
//    console.error("Error loading gallery:", err);
//    res.send("Error loading gallery");
//  }
//});

  const images = await Image.findAll({
      where: {
        [Op.or]: [
          { visibility: "public" },
          { user_id: req.session.user.id }
        ]
      },
      include: [
        {
          model: Rating,
          attributes: []
        }
      ],
      attributes: {
        include: [
          [fn("AVG", col("Ratings.rating")), "avg_rating"]
        ]
      },
      group: ["Image.id"]
    });

     // Add user-specific rating for each image
    const imagesWithUserRating = await Promise.all(images.map(async (image) => {
      const userRating = await Rating.findOne({
        where: {
          user_id: req.session.user.id,
          image_id: image.id
        }
      });
      return {
        ...image.get({ plain: true }),
        user_rating: userRating ? userRating.rating : null
      };
    }));

    res.render("index", {
      images: imagesWithUserRating,
      user: req.session.user
    });
  } catch (err) {
    console.error("Error loading gallery:", err);
    res.send("Error loading gallery");
  }
});

// Upload form
router.get("/upload", requireLogin, (req, res) => {
  res.render("upload");
});

// Handle image upload
router.post("/upload", requireLogin, upload.single("image"), async (req, res) => {
  console.log("Uploaded file:", req.file);   // Debug file
  console.log("Form data:", req.body);       // Debug visibility

  if (!req.file) {
    return res.send("No file uploaded. Please select an image.");
  }

  const { visibility } = req.body;
  const filename = req.file.filename;
  const userId = req.session.user.id;


  try {
    //const conn = await pool.getConnection();
    //await conn.query(
    //  "INSERT INTO images (filename, user_id, visibility) VALUES (?, ?, ?)",
    //  [filename, userId, visibility || 'public']
   // );
   // conn.release();
//new code--------
   await Image.create({
      filename,
      user_id: userId,
      visibility: visibility || "public"
    });

    res.redirect("/");
  } catch (err) {
    console.error("Upload error:", err);
    res.send("Error uploading image");
  }
});

// Toggle public/private
router.post("/toggle-visibility", requireLogin, async (req, res) => {
  const { filename } = req.body;
  const userId = req.session.user.id;

    console.log("Toggle request received");
  console.log("Filename from form:", filename);
  console.log("User ID from session:", userId);

  try {
    //const conn = await pool.getConnection();
    //const rows = await conn.query(
    //  "SELECT visibility FROM images WHERE filename = ? AND user_id = ?",
     // [filename, userId]
    //);

   // console.log("DB query returned rows:", rows.length);

    //if (!rows.length) {
    //  conn.release();
    //  return res.send("Not authorized");
    //}

    //const newVisibility = rows[0].visibility === "public" ? "private" : "public";
    //await conn.query(
     // "UPDATE images SET visibility = ? WHERE filename = ? AND user_id = ?",
     // [newVisibility, filename, userId]
    //);
    //conn.release();

        const image = await Image.findOne({
      where: { filename, user_id: userId }
    });

    if (!image) {
      return res.send("Not authorized");
    }

    image.visibility = image.visibility === "public" ? "private" : "public";
    await image.save();

    res.redirect("/");
  } catch (err) {
    console.error("Error toggling visibility:", err);
    res.send("Error updating visibility");
  }
});

//const fs = require("fs");

// Delete image route
router.post("/delete-image", requireLogin, async (req, res) => {
  const { filename } = req.body;
  const userId = req.session.user.id;

  try {
    //const conn = await pool.getConnection();
    //const rows = await conn.query(
    //  "SELECT * FROM images WHERE filename = ? AND user_id = ?",
     // [filename, userId]
    //);

   // if (!rows.length) {
    //  conn.release();
    //  return res.send("Not authorized to delete this image");
    //}

    //await conn.query("DELETE FROM images WHERE filename = ? AND user_id = ?", [filename, userId]);
   // conn.release();

    // Delete the file from the uploads folder
   // const filePath = path.join(__dirname, "..", "uploads", filename);
   // fs.unlink(filePath, (err) => {
   //   if (err) console.error("Failed to delete file:", err);
   // });

       const image = await Image.findOne({
      where: { filename, user_id: userId }
    });

    if (!image) {
      return res.send("Not authorized to delete this image");
    }

    await image.destroy();

    const filePath = path.join(__dirname, "..", "uploads", filename);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    res.redirect("/");
  } catch (err) {
    console.error("Error deleting image:", err);
    res.send("Error deleting image");
  }
});


module.exports = router;
