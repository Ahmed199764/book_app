'use strict';
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 4000;
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  const url = 'https://www.googleapis.com/books/v1/volumes?q=quilting';
  superagent.get(url).then((apiResponse) => {
    console.log(apiResponse.body.items[0]);
  });
  res.render('pages/index');
});

app.get('/hello', (req, res) => {
    res.render('pages/index');
  });

app.listen(PORT, () => console.log('OK!'));
