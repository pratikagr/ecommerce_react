const router = require("express").Router();
const auth = require("../middleware/auth");
const multerMiddleware = require("../middleware/multer");
const uploadController = require("../controller/uploadController");

router.post("/upload", auth, multerMiddleware, uploadController.upload);

module.exports = router;
