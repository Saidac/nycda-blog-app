const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      db = require('./models'),
      session = require('express-session'),
      Sequelize = require('sequelize'),
      app = express(),
      adminRouter = require('./routes/admin');


app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

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

// put the dynamic routes at the very end !!

//
// app.post thing for commetns
//
//

app.get('/', (request, response) => {
  db.Entry.findAll({ order: [['createdAt', 'DESC']] }).then((entries) => {
    response.render('index', { entries: entries });
  });
});

app.get('/:slug', (request, response) => {
  db.Entry.findOne({
   where: {
     slug: request.params.slug
   }
 }).then((entry) => {
     response.render('entries/show', { entry: entry});
  });
});


db.sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
