const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });

var adminRouter = require('./routes/admin');

app.use(express.static(__dirname + '/public'));


//Models
var Entry = sequelize.define('entry', {
  title: Sequelize.TEXT,
  content: Sequelize.STRING
});

app.use(morgan('dev'));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.get('/', (request, response) => {
  response.redirect('/entries');
});

app.use('/entries', adminRouter);

sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
