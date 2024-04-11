const router = require("express").Router();
const categoryController = require("../controller/categoryController");
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

router.get("/categories", categoryController.getCategories);
router.post(
  "/categories",
  auth,
  authAdmin,
  categoryController.createCategories
);

router.delete(
  "/categories/:id",
  auth,
  authAdmin,
  categoryController.deleteCategory
);

router.put(
  "/categories/:id",
  auth,
  authAdmin,
  categoryController.updateCategory
);

module.exports = router;
