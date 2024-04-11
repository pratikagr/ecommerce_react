const router = require("express").Router();
const productController = require("../controller/productController");
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

router.get("/products", productController.getProduct);
router.post("/products", auth, authAdmin, productController.createProduct);
router.delete(
  "/products/:id",
  auth,
  authAdmin,
  productController.deleteProduct
);
router.put("/products/:id", auth, authAdmin, productController.updateProduct);

module.exports = router;
