const router = require("express").Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getMyProducts,
} = require("../controllers/productsController");
const { protect } = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath); // Ensure you use an absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use unique file names
  },
});

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  },
});

// Define routes
router
  .route("/")
  .get(getProducts)
  .post(protect, upload.array("images", 5), createProduct); // Use multer middleware here
router.route("/:slug").delete(protect, deleteProduct);

router.route("/slug/:slug").get(getProductBySlug);
router.route("/myProducts").get(protect, getMyProducts);

router
  .route("/:slug")
  .patch(protect, updateProduct)
  .put(protect, updateProduct);

module.exports = router;
