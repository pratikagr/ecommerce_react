const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const multerMiddleware = (req, res, next) => {
  try {
    upload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(400).json({ msg: "Multer error", error: err });
      } else if (err) {
        // An unknown error occurred
        return res.status(500).json({ msg: "Server error", error: err });
      }

      // Check if req.file is present
      if (!req.file) {
        return res.status(400).json({ msg: "Invalid file type" });
      }

      // No errors, proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

module.exports = multerMiddleware;
