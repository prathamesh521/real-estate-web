const multer = require("multer");
const path = require("path");

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only .png or .jpg files are allowed"), false);
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB max file size
  fileFilter,
});

module.exports = upload;
