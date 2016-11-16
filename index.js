const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      Sequelize = require('sequelize');

var db = require('./models');

var app = express();

var adminRouter = require('./routes/admin');

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride(function (request, response) {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    var method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

app.use('/admin', adminRouter);

// SFSG ##########################################

app.get('/', (request, response) => {
  db.Entry.findAll().then((entries) => {
    response.render('index', { entries: entries });
  });
});

app.get('/:slug', (request, response) => {
  db.Entry.findOne({
    where: {
      slug: request.params.slug
    }
  }).then((post) => {
    response.render('entries/show', { entry: entries });
  }).catch((error) => {
    response.status(404).end();
  });
});

db.sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
