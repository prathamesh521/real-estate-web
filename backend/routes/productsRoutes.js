const router = require("express").Router();
const { createProduct, getProducts, updateProduct, deleteProduct, getProductBySlug } = require("../controllers/productsController");
const { protect } = require("../middlewares/authMiddleware");


router.route("/").get( getProducts).post(protect, createProduct);
router.route("/:id").patch(protect, updateProduct).delete(protect, deleteProduct);

router.route("/slug/:slug").get(getProductBySlug);

module.exports = router;