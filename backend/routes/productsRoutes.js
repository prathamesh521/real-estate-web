const router = require("express").Router();
const { createProduct, getProducts, updateProduct, deleteProduct, getProductBySlug, getMyProducts } = require("../controllers/productsController");
const { protect } = require("../middlewares/authMiddleware");


router.route("/").get( getProducts).post(protect, createProduct);
router.route("/:slug").delete(protect, deleteProduct);

router.route("/slug/:slug").get(getProductBySlug);
router.route("/myProducts").get(protect, getMyProducts);

router.route("/:slug").patch(protect, updateProduct).put(protect, updateProduct);

module.exports = router;