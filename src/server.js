// Require environmental variables
require('dotenv').config();

// Modules ======================================================================
const express  = require('express'),
    app        = express(),
    flash      = require('connect-flash'),
    passport   = require('passport'),
    aws        = require('aws-sdk');
// End Modules ==================================================================

app.set('view engine', 'ejs');
app.set('views', './src/views');

require("./initializers/knex");

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.use(require('express').static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb',extended: true }));
app.use(require('cookie-parser')());
app.use(flash());

app.use(require('express-session')({ secret: process.env.TOKEN_SECRET }));

// Routes ======================================

const testFolder = require("path").join(__dirname, "./routes");

const fs = require('fs');

fs.readdir(testFolder, function(err, files) {

    files.forEach(function (file) {
        file = file.replace(".js","");
        require("./routes/"+file)(app);
        console.log("Loaded /" + file + " route");
    });

    // Single Page React App
    app.get("*", function (req, res) {
        res.render('home');
    });

});

// End Routes ==================================


// Connection ===================================================================

app.listen((process.env.PORT || 4000), function () {
    console.log('App listening on port ', (process.env.PORT || 4000));

});
// End Connections ===================================================================