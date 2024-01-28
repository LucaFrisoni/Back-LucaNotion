require("dotenv").config();

const { Sequelize } = require("sequelize");
const Notes = require("./Models/Notes");
const Category = require("./Models/Category");

//Te conectas a la Db instanciando Sequilize
const sequelize = new Sequelize(
  process.env.DB_URL,
  { logging: false, native: false } //
);
//El loggin:false deshabilita que aparezcan en la consola todas las consultas que SQL realiza
//El native:false desactiva el uso del controlador nativo de PostgreSQL. Sequilize se conectara a la Db a traves de una bibiloteca pura de Js

//Le paso sequeilize a los models
Notes(sequelize);
Category(sequelize);


module.exports = {
  ...sequelize.models,
  sequelize,
};
