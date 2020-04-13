'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
// const cors = require('cors');
const PORT = process.env.PORT || 4000;
const app = express();
// app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/hello', (req, res) => {
    res.render('pages/index');
  });

app.get('/searches/new', (req, res) => {
    res.render('pages/searches/new');
});

app.get('/searches/show', (req, res) => {
    res.render('pages/searches/show');
});

app.post('/searches/show', (req, res) => { 
    const url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.search}`;
    superagent.get(url).then((apiResponse) => {
        const book = apiResponse.body.items.map((data) => {
            return new Book(data);
          });
          res.render('pages/searches/show.ejs', { book: book });
    })
    .catch((err) => errorHandler(err, req, res));
  });

function Book(data) {
    this.image_url = data.volumeInfo.imageLinks.thumbnail  ? data.volumeInfo.imageLinks.thumbnail : "DEFULT IMG";
    this.title = data.volumeInfo.title ?  data.volumeInfo.title : "DEFULT TITLE";
    this.author = data.volumeInfo.authors ? data.volumeInfo.authors : "DEFULT AUTHOR";
    this.description = data.volumeInfo.description ? data.volumeInfo.description : "DEFULT DESCRIPTION";
  }

app.get('*', (request, response) => response.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log('OK!'));

const handleError = (error, response) => {
    response.render('pages/error', {error: error})
  }