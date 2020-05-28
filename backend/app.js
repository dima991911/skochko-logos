const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

mongoose.promise = global.Promise;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

if (!isProduction) {
  app.use(errorHandler());
}

mongoose.connect('mongodb+srv://dima991911:192837465ds@skochko-design-bkl1q.mongodb.net/skochko-design?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

// Models for db
require('./models/Users');
require('./models/ProjectSamples');
require('./models/Projects');

app.use(require('./routes'));

app.listen(process.env.PORT || 8080, () => console.log(`Server running on 8080`));
