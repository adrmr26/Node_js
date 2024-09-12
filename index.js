const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const task = require('./api/');
const authCtrl = require('./api/auth');
const cors = require('cors');

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

// routes
app.use("/api/users", Users);
app.use("/api/pymes", Pymes);
app.use("/api/auth", authCtrl);

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb://mongo:27017",  { useNewUrlParser: true },
  (err, res) => {
    err && console.log('Error al conectar a la DB' + err.message);
    app.listen(5000, () => {
      console.log("Servidor corriendo en Puerto 5000");
    });
  }
);