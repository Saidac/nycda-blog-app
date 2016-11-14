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

//Dependencies

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');




sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
