const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize');

var app = express();
    sequelize = new Sequelize('wille','wille', '', {dialect: 'postgres' });

//Models
var Entry = sequelize.define('entry', {
  title: Sequelize.TEXT,
  content: Sequelize.STRING
});


app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

// Setting app pug to root
app.get('/', (request, response) => {
  Entry.findAll({ order: [['createdAt', 'DESC']] }).then((entry) => {
    response.render('entries/index', { entries: entry });
  });
});

app.get('/entries/new', (request, response) => {
  response.render('entries/new');
});

// Redirect user to frontpage after posting question
app.post('/postentry', (request, response) => {

  if (request.body.content) {
    Entry.create(request.body).then(() => {
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
