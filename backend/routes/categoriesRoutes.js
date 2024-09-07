const router = require("express").Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoriesController");

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').patch(updateCategory).delete(deleteCategory).get(getCategoryById);

module.exports = router;