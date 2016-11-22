'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Entries', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });

    queryInterface.changeColumn('Entries', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });

    queryInterface.changeColumn('Entries', 'content', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    queryInterface.changeColumn('Comments', 'content', {
      type: Sequelize.TEXT,
      allowNull: false
    });
},

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
