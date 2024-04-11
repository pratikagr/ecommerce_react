const userController = require("../controller/userController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/refreshtoken", userController.refreshToken);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/info", auth, userController.getUser);

module.exports = router;
