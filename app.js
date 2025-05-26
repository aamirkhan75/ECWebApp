// Set up the environment variables
const dotenv = require("dotenv");
dotenv.config();

// Importing packages and modules
const { auth } = require("express-openid-connect");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// Setting up the configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL,
};

mongoose.connect(process.env.mongodb_uri).then(()=>{
  console.log("Connected to MongoDB");
}).catch((err)=>{
  console.log(err);
});


app.set("view engine", "ejs");
app.use(auth(config));
app.use(express.json());

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/items", async function (req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt (req.query.limit) || 10
  const skip = (page - 1) * limit;
  const count = await Product.countDocuments();
  const products = await Product.find().sort({createdAt: -1}).skip(skip).limit(limit)
  res.json({
    page,totalpages:Math.ceil(count/limit),
products


  })
});
app.post( "/item", async function (req,res) {
  const data = req.body;
const currentData = new Product(data);
const savedData= await currentData.save();




  res.send(savedData);


})

app.get("/items/top/:count",async function (req,res){

  var count= req.params.count;
  const items = await Product.find({}).limit(count);
  res.json({items});

  
})



app.get("/Aamir", function (req, res) {
  res.send("Hello Aamir");
});

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`);
});
