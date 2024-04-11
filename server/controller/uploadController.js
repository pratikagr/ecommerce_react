const uploadController = {
  upload: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
      }
      const fileUrl =
        req.protocol + "://" + req.get("host") + "/" + req.file.path;
      return res.status(200).json({ msg: "Url", fileUrl });
    } catch (err) {
      return res.status(500).json({ msg: "error", err });
    }
  },
};

module.exports = uploadController;
