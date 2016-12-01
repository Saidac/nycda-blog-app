// process.env.NODE_ENV = 'test';
//
// const assert = require('assert');
//
// var db = require('../models');
//
// describe('MODEL: ENTRY', () => {
//   before((done) => {
//     db.sequelize.sync({ force: true }).then(() => {
//       done();
//     });
//   });
//
// it('Create a blog entry', (done) => {
//   db.Entry.create({
//     title: "Bill's Great Bog ENTRY",
//     slug: 'our test slug',
//     content: '<h1> So awesome </h1>'
//   }).then((entry) => {
//       assert.equal(entry.isNewRecord, false);
//       assert.equal(entry.title, "Bill's Great Bog ENTRY");
//       assert.equal(entry.slug, 'our test slug');
//       assert.equal(entry.content, '<h1> So awesome </h1>');
//       done();
//     });
//   });
//
// it('Cannot create a entry if title is missing', (done) => {
//   db.Entry.create({
//     slug: 'our test slug',
//     content: '<h1>So awesome!</h1>'
//   }).catch((error) => {
//     assert.equal(error.errors[0].message, 'title cannot be null');
//     assert.equal(error.errors.length, 1);
//     done();
//   });
// });
//
// it('Cannot create a entry if content is missing', (done) => {
//   db.Entry.create({
//     title: 'Williams awesome blog entry',
//     slug: 'our test slug'
//   }).catch((error) => {
//     assert.equal(error.errors[0].message, 'content cannot be null');
//     assert.equal(error.errors.length, 1);
//     done();
//   });
// });
//
// it('updates a blog entry', (done) => {
//   db.Entry.update({
//     title: 'Updated new title',
//     content: '<h5>New Content</h5>',
//     slug: 'our-new-slug'
//   }, {
//     where: {
//       title: 'Bills great blog article'
//     },
//     returning: true
//   }).then((updateData) => {
//     var entry = updateData[1][0];
//     assert.equal(entry.title, 'Updated new title');
//     assert.equal(entry.content, '<h5>New Content</h5>');
//     assert.equal(entry.slug, 'our-new-slug');
//     done();
//   });
// });
// });
