// Dependencies
<<<<<<< HEAD
// =============================================================
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const { createCanvas } = require('canvas');

// Sets up the Express App
// =============================================================
=======
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');

// Require the 'express-session' module
const session = require('express-session');

// Sets up the Express App
>>>>>>> develop
const app = express();
const PORT = process.env.PORT || 3001;

// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
<<<<<<< HEAD
app.set('view engine','handlebars');

// Set up the session with the 'secret', 'resave', 'saveUninitialized' options
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));

const mycanvas = createCanvas(200, 200);
const data = {
  canvas : mycanvas
}
app.get('/', (req, res) => {
  res.render('body', data);
});
=======
app.set('view engine', 'handlebars');

// Set up the session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

app.use('/', routes);
app.use('/login', routes);
>>>>>>> develop

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});