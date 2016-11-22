var express = require('express'),
    db = require('../models'),
    router = express.Router();

// Common logic put in middleware 
var requireUser = (request, response, next) => {
    if (request.session.user) {
      next();
    } else {
      response.redirect('/login');
    }
};

router.use(requireUser);

router.get('/entries', (request, response) => {
    db.Entry.findAll().then((entries) => {
      response.render('entries/index', { entries: entries });
    }).catch((error) => {
      throw error;
    });
});

router.get('/entries/new', (request, response) => {
  response.render('entries/new');
});

router.get('/entries/:id/edit', (request, response) => {
    db.Entry.findOne({
       where: {
         id: request.params.id
       }
     }).then((entry) => {
        response.render('entries/edit', { entry: entry});
     });
      response.redirect('/login');
});

router.post('/entries', (request, response) => {
  db.Entry.create(request.body).then((entry) => {
    response.redirect('/' + entry.slug);
  });
      response.redirect('/login');
});

router.put('/entries/:id', (request, response) => {
  db.Entry.update(request.body, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/admin/entries');
  });
    response.redirect('/login');
});


router.delete('/entries/:id', (request, response) => {
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
