const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/passportfun', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const app = express();

//static files
app.use(express.static('public'));

//handle post bodies
app.use(bodyParser.urlencoded({extended: false}));

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
