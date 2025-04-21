const dotenv = require('dotenv');

dotenv.config();

const { auth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.secret,
    baseURL: process.env.baseURL,
    clientID: process.env.clientID,
    issuerBaseURL:process.env.issuerBaseURL
  };
  // auth router attaches /login, /logout, and /callback routes to the baseURL




const express = require('express');
const app = express();
app.use(auth(config));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index.ejs' );
    
});



app.get('/dashboard',function(req,res){
    res.send("Hello welcome to Dashboard");



});




app.get('/Aamir', function (req, res) {
    res.send("Hello Aamir");
});

app.listen(process.env.PORT, function ()  {
    console.log(`Server is running on port ${process.env.PORT}`);
});


