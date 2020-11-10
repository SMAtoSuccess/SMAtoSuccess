// Dependencies
// =============================================================
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine','handlebars');

// Set up the session with the 'secret', 'resave', 'saveUninitialized' options
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));

app.get('/', (req, res) => {

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
  });