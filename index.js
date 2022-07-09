const express = require('express');
const app = express();
const http = require('http').Server(app);
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require("./router");
require('dotenv').config();

const PORT = process.env.PORT;

app.locals.mongoose = mongoose.connect(process.env.DB_CONNECTION);

const corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use("/api",router);


http.listen(PORT, function () {
    console.log('server: http://localhost:' + PORT);
});

module.exports = {
    close(callback) {
        http.close(() => console.log("server closed"));
        app.locals.mongoose.connection.close();
        callback();
    }
}