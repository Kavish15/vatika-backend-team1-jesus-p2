const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://vatika.netlify.app",
      "https://vatika.online",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "DELETE"],
  })
);

//Router Import's
const orderhistoryRouter = require("./routes/orderhistory");
const productRouter = require("./routes/product");
const blogRouter = require("./routes/blog");
const addressRouter = require("./routes/address");
const superCoinRouter = require("./routes/supercoin");
const paymentRouter = require("./routes/payment");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");

//Connection to MongoDB
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to DB");
});

//Middleware
app.use(express.json()); //this is to accept data in JSON Format
app.use(bodyParser.urlencoded({ extended: true })); //this is to decode the data sent from FrontEnd
app.use(express.static(path.join(__dirname, "public")));

app.use("/", orderhistoryRouter); //orderhistoryRoute Middleware
app.use("/", productRouter); //addProductRoute Middleware
app.use("/", blogRouter); //blogRoute Middleware
app.use("/", addressRouter); //userAddressRoute Middleware
app.use("/", superCoinRouter); //superCoinRoute Middleware
app.use("/", paymentRouter); //paymentRoute Middleware
app.use("/api/signup", signupRouter); //signUpRoute Middleware
app.use("/api/login", loginRouter); // loginRoute Middleware

//Default Router
app.get("/", (req, res) => {
  res.send("Welcome to Vatika");
});

//Confirmation
app.post("/confirmation", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "confirm.html"));
});

//Listening to Port
const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started");
});

module.exports = server;
