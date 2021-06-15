const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PW
});


// import sequelize connection
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(result => {
  // console.log(result)
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  })
}).catch(err => {
  console.log(err)
})
