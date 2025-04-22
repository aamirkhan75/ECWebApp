// Set up the environment variables
const dotenv = require("dotenv");
dotenv.config();

// Importing packages and modules
const { auth } = require("express-openid-connect");
const express = require("express");
const app = express();

// Setting up the configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL,
};
app.set("view engine", "ejs");
app.use(auth(config));

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/dashboard", function (req, res) {
    if(req.oidc.isAuthenticated()){
        console.log(req.oidc.user);
  res.send("Hello welcome to Dashboard");
}else{
    res.redirect("/login");
}
});

app.get("/Aamir", function (req, res) {
  res.send("Hello Aamir");
});

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`);
});
