const category = require("../models/categoryModels");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await category.find();
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: "error", err });
    }
  },
  createCategories: async (req, res) => {
    try {
      const { name } = req.body;
      const Category = await category.findOne({ name });
      if (Category)
        return res.status(400).json({ msg: "Cateogry already exist" });
      const newCategory = new category({ name });
      await newCategory.save();
      res.json({ msg: "Created a Category" });
    } catch (err) {
      return res.status(500).json({ msg: "error", err });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Category" });
    } catch (err) {
      return res.status(500).json({ msg: "error", err });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Updated" });
    } catch (err) {
      return res.status(500).json({ msg: "error", err });
    }
  },
};

module.exports = categoryController;
