'use strict';

module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define('Entry', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull:false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.Comment);
      }
    }
  });
  return Entry;
};
