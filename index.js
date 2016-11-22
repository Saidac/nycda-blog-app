const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      morgan = require('morgan'),
      pug = require('pug'),
      Sequelize = require('sequelize');

var db = require('./models');

var app = express();

var adminRouter = require('./routes/admin');

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

app.post('/entries/:id/comments', (request, response) => {
  db.Entry.findById(request.params.id).then((entry) => {
    var comment = request.body;
    comment.EntryId = entry.id;

    db.Comment.create(comment).then(() => {
      response.redirect('/' + entry.slug);
    });
  });
});


app.get('/', (request, response) => {
  db.Entry.findAll({ order: [['createdAt', 'DESC']] }).then((entries) => {
    response.render('index', { entries: entries });
  });
});

// app.get('/:id', (request, response) => {
//    db.Entry.findById(request.params.id).then((entry) => {
//          response.render('entries/show', { post: post });
//   });
// });

app.get('/:slug', (request, response) => {
  db.Entry.findOne({
   where: {
     slug: request.params.slug
   }
 }).then((entry) => {
   return entry.getComments().then((comments) => {
     response.render('entries/show', { entry: entry, comments: comments });
   });
}).catch((error) => {
  response.status(404).end();
  });
});


db.sequelize.sync().then(() => {
  console.log('Connected to db');
  app.listen(3001, () => {
    console.log('Web Server is running on port 3001');
  });
});
