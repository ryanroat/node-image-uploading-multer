/* eslint-disable linebreak-style */

// dependencies
import express from 'express';
import ejs from 'ejs';
import multer from 'multer';
import path from 'path';

// init express server

const app = express();

const port = 3000;

// set EJS as template view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// use a public folder for static elements
app.use(express.static('./public'));

// render index page on GET requests to root
app.get('/', (req, res) => res.render('index'));

// TODO: need to catch 404 after all other paths

app.listen(port, () => console.log(`Server running on port ${port}.`));
