const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash-messages');
const expressValidator = require('express-validator');

mongoose.connect('mongodb://localhost:27017/passportfun', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const app = express();

//static files
app.use(express.static('public'));

//session
app.use(session({
  secret: 'fadlkuanvdflbdissgndvdoerisfdslj',
  resave: false,
  saveUninitialized: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./passportconfig').configure(passport);

//handle post bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

//mustache
const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view engine', 'mustache');

app.use(require('./routes/general'));
app.use(require('./routes/auth'));

app.listen(3000, function() {
  console.log('Listening on port 3000.');
});
