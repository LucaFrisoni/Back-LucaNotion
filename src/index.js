const app = require("./app");

const { sequelize } = require("./Database/ConecctionDB");

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server raised in port: http://localhost:3001`);
  sequelize.sync({ alter: true }).catch((err) => {
    console.error("Error in DB connection:", err);
  });
  console.log(`Server conected to Postgres`);
});
