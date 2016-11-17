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

app.use(session({ secret: 'our secret key' }));

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

app.get('/register', (req, res) => {
  res.render('users/new');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  console.log(req.body);

  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((userInDB) => {
    if (userInDB.password === req.body.password) {
      req.session.user = userInDB;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  }).catch(() => {
    res.redirect('/login');
  });
});

app.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/');
});

app.post('/users', (req, res) => {
  db.User.create(req.body).then((user) => {
    res.redirect('/');
  }).catch(() => {
    res.redirect('/register');
  });
});


app.get('/:slug', (request, response) => {
  db.Entry.findOne({
    where: {
      slug: request.params.slug
    }
  }).then((entry) => {
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
