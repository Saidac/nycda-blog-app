var express = require('express'),
    db = require('../models'),
    router = express.Router();

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

router.get('/entries/:id', (request, response) => {
  db.Entry.findById(request.params.id).then((entry) => {
    response.render('entries/show', {entry: entry });
  });
});

router.get('/entries/:id/edit', (request, response) => {
  console.log('this gets hit');
  db.Entry.findById(request.params.id).then((entry) => {
    response.render('entries/edit', { entry: entry });
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
