const router = require("express").Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productsController");
const { protect } = require("../middlewares/authMiddleware");


router.route("/").get( getProducts).post(protect, createProduct);
router.route("/:id").patch(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;