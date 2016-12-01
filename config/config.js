module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "nycda_blogapp_testdb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "logging": false,
    "database": "nycda_blogapp_testdb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "wille",
    "password": null,
    "database": "nycda_blogapp_testdb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
