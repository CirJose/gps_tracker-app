const { Sequelize } = require('sequelize');

// Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.BD_DATABASE, process.env.BD_USER, process.env.BD_PASS, {
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  dialect: process.env.BD_DIALECT, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  logging: (...msg) => console.log(msg),
});