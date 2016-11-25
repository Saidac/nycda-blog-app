var express = require('express'),
    db = require('../models'),
    router = express.Router();

var requireUser = (request, response, next) => {
    if (request.path === '/') {
      return next();
    }

    if (request.session.user) {
      next();
    } else {
      response.redirect('/admin');
    }
};

router.use(requireUser);

router.get('/', (request, response) => {
  if (request.session.user) {
    response.redirect('/admin/entries');
  }
    response.render('login');
});

router.get('/entries', (request, response) => {
    db.Entry.findAll().then((entries) => {
      response.render('entries/index', { entries: entries, user:request.session.user });
    }).catch((error) => {
      throw error;
    });
});

router.get('/entries/new', (request, response) => {
  response.render('entries/new', { user:request.session.user });
});

router.get('/entries/:id/edit', (request, response) => {
    db.Entry.findOne({
       where: {
         id: request.params.id
       }
     }).then((entry) => {
        response.render('entries/edit', { entry: entry, user:request.session.user });
     });
});

router.post('/entries', (request, response) => {
  db.Entry.create(request.body).then((entry) => {
    response.redirect('/' + entry.slug);
  });
});

router.put('/entries/:id', (request, response) => {
  db.Entry.update(request.body, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/admin/entries');
  });
});


router.delete('/entries/:id', (request, response) => {
  db.Entry.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/admin/entries');
  });
});

module.exports = router;
