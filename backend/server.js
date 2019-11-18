const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
let path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const checkToken = require('./middleware/checkToken');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', err => {
  if (err) {
    throw err;
  } else {
    console.log('MongoDB database connection established successfully.');
  }
});

//routing
const userRouter = require('./routes/users');
const projectRouter = require('./routes/project');

app.use('/api/users', userRouter);
app.use('/api/project', projectRouter);

app.use('/static', express.static(path.join(__dirname, '../build//static')));
app.use('/img', express.static(path.join(__dirname, '../resources//img')));

app.get('*', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
});

/* app.get('/admin', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
}); */

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
