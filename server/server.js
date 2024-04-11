const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");

app.listen(PORT, () => {
  console.log("Server Running on 5000");
});

//middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ msg: "This is Example" });
});

//routes
app.use("/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/uploadRouter"));

const URI = "mongodb://localhost:27017";
mongoose
  .connect(URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  });
