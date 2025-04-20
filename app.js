const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index.ejs' );
    
});

app.get('/Aamir', function (req, res) {
    res.send("Hello Aamir");
});

app.listen(process.env.PORT, function ()  {
    console.log(`Server is running on port ${process.env.PORT}`);
});


