const Users = require("../models/userModel");
const crypto = require("crypto");
require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "Email already registered" });
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters long" });
      }
      const passwordHash = await bcrypt.hash(password, 10); // password encryption
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      await newUser.save(); // save in MongoDB
      //token
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id }); // Token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refreshtoken",
      });
      res.status(200).json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      console.log(rf_token);
      if (!rf_token)
        return res.status(400).json({ msg: "Please login or register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "Please login or register" });
        }
        const accessToken = createAccessToken({ id: user.id });
        res.json({ user, accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: "Error", error: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: "user doesn't exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "incorrect password" });
      }
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id }); // Token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refreshtoken",
      });
      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: "error", err });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        path: "/user/refresh_token",
      });
      res.json({ msg: "Logged Out Successfully" });
    } catch (err) {
      console.status(400).json({ msg: "error", err });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: "error", err });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userController;
