var express = require('express'),
    db = require('../models'),
    Sequelize = require('sequelize'),
    router = express.Router();


// Setting app pug to root
router.get('/entries', (request, response) => {
  db.Entry.findAll({ order: [['createdAt', 'DESC']] }).then((entry) => {
    response.render('entries/index', { entries: entry });
  });
});

// New
router.get('/entries/new', (request, response) => {
  response.render('entries/new');
});

router.get('/entries/:id/edit', (request, response) => {
  db.Entry.findOne({
    where: {
      id: request.params.id
    }
  }).then((post) => {
    response.render('posts/edit', { entries: entry });
  });
});

// So far so good!


// Redirect user to root after posting new entry
router.post('/postentry', (request, response) => {

  if (request.body.content) {
    db.Entry.create(request.body).then(() => {
      response.redirect('/');
    });
  } else {
    response.redirect('/');
  }
});

// Edit
router.put('/entries/:id', (request, response) => {
  db.Entry.update(request.body, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/admin/entries');
  });
});

// Delete
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
