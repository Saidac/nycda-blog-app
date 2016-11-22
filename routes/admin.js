var express = require('express'),
    db = require('../models'),
    router = express.Router();

router.get('/entries', (request, response) => {
  if (request.session.user) {
    db.Entry.findAll().then((entries) => {
      response.render('entries/index', { entries: entries });
    }).catch((error) => {
      throw error;
    });
  } else {
    response.redirect('/login');
  }
});

router.get('/entries/new', (request, response) => {
  if (request.session.user) {
  response.render('entries/new');
} else {
  response.redirect('/login');
}
});

router.get('/entries/:id/edit', (request, response) => {
  if (request.session.user) {
    db.Entry.findOne({
       where: {
         id: request.params.id
       }
     }).then((entry) => {
        response.render('entries/edit', { entry: entry});
     });
  } else {
      response.redirect('/login');
  }
});

router.post('/entries', (request, response) => {
  if (request.session.user) {
  db.Entry.create(request.body).then((entry) => {
    response.redirect('/' + entry.slug);
  });
  } else {
      response.redirect('/login');
  }
});

router.put('/entries/:id', (request, response) => {
  if (request.session.user) {
  db.Entry.update(request.body, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/admin/entries');
  });
  } else {
    response.redirect('/login');
  }
});


router.delete('/entries/:id', (request, response) => {
  if (request.session.user) {
  db.Entry.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/admin/entries');
  });
  } else {
  response.redirect('/login');
  }
});

module.exports = router;
