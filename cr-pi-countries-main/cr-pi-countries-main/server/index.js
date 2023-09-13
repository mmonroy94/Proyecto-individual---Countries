// const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js'); // Instancia de sequelize
const PORT = 3001;
const { getCountries } = require('./countriesLoader')

conn.sync({ alter : true }).then(() => {
  console.log('Database connected');
  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  getCountries();
})
}).catch(error => console.error(error))