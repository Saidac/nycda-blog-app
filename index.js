const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug');
      bodyParser = require('body-parser');
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });

//Models
var Entery = sequelize.define('entery', {
    title: Sequelize.TEXT,
    content: Sequelize.STRING,
    slug: Sequelize.TEXT
});

// var Comments = sequelize.define('comment', {
//     content: Sequelize.TEXT,
//     email: Sequelize.STRING,
// });

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

// Setting app pug to root
app.get('/', (request, response) =>{
  Entery.findAll({ order: 'id DESC' }).then((entery) => {
    entery.forEach((entery) => {
      entery.createdAtFromNow = moment(entery.createdAt).fromNow();
    });
    response.render('enteries/index', { queries: query });
  });
});

app.get('/enteries/new', (request, response) => {
  response.render('enteries/new');
});

// Redirect user to frontpage after posting question
app.post('/postentery', (request, response) => {

  if (request.body.entery) {
    Entery.create(request.body).then(() => {
      response.redirect('/');
    });
  } else {
    response.redirect('/');
  }
});

sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
