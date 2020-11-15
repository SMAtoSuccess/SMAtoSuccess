// Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
const sequelize = require('./config/connection');
<<<<<<< HEAD
=======

>>>>>>> develop
// Require the 'express-session' module
const session = require('express-session');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up the session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

<<<<<<< HEAD
=======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


>>>>>>> develop
app.use(routes);

// Starts the server to begin listening
// =============================================================
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});