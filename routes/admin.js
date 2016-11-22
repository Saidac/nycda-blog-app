var express = require('express'),
    db = require('../models'),
    router = express.Router();

// Common logic put in middleware
var requireUser = (request, response, next) => {
    if (request.session.user) {
      next();
    } else {
      response.redirect('/admin');
    }
};

router.get('/', (request, response) => {
  response.render('login');
});

router.get('/entries', requireUser, (request, response) => {
    db.Entry.findAll().then((entries) => {
      response.render('entries/index', { entries: entries });
    }).catch((error) => {
      throw error;
    });
});

router.get('/entries/new', requireUser, (request, response) => {
  response.render('entries/new');
});

router.get('/entries/:id/edit', requireUser, (request, response) => {
    db.Entry.findOne({
       where: {
         id: request.params.id
       }
     }).then((entry) => {
        response.render('entries/edit', requireUser, { entry: entry});
     });
      response.redirect('/login');
});

router.post('/entries', requireUser,(request, response) => {
  db.Entry.create(request.body).then((entry) => {
    response.redirect('/' + entry.slug);
  });
      response.redirect('/login');
});

router.put('/entries/:id', requireUser,(request, response) => {
  db.Entry.update(request.body, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/admin/entries');
  });
    response.redirect('/login');
});


router.delete('/entries/:id', requireUser,(request, response) => {
  db.Entry.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/admin/entries');
  });
  response.redirect('/login');
});

module.exports = router;
