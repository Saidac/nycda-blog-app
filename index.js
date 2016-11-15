const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      displayRoutes = require('express-routemap'),
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

app.use(methodOverride(function (request, respond) {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    var method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

app.use('/admin', adminRouter);

// SFSG ##########################################

app.get('/', (request, respond) => {
  Entry.findAll().then((enteries) => {
    respond.render('app', { enteries: enteries });
  });
});

app.get('/:slug', (request, respond) => {
  Entry.findOne({
    where: {
      slug: request.params.slug
    }
  }).then((post) => {
    respond.render('entries/show', { entry: entries });
  }).catch((error) => {
    respond.status(404).end();
  });
});

sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
    displayRoutes(app);
  });
});
