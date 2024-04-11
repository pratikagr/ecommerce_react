const Users = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      _id: req.user.id,
    });
    if (user.role === 0)
      return res.status(400).json({ msg: "Admin Resouces Access Denied" });
    next();
  } catch (err) {
    return res.status(500).json({ msg: "error", err });
  }
};

module.exports = authAdmin;
