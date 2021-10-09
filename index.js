const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const productRoute = require("./routers/product");
const cartRoute = require("./routers/cart");
const orderRoute = require("./routers/order");


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfully!"))
  .catch((err) => {
    console.log(err);
  });

  app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);


app.listen(process.env.PORT || 5500, () => {
    console.log("Backend server is running!");
  });