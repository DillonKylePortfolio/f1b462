const Sequelize = require("sequelize");


const db = new Sequelize('messenger', 'postgres', '2009Prius!', {
  host: 'localhost',
  dialect: 'postgres'
});
module.exports = db;
