/* eslint-disable linebreak-style */
/* eslint-disable no-console */

// dependencies
import express from 'express';
import partials from 'express-partials';
// eslint-disable-next-line no-unused-vars
import ejs from 'ejs';
import multer from 'multer';
import path from 'path';

// app global constants
const fileSIzeByteLimit = 1000000; // set the upper file size limit in bytes here
const allowedFileTypes = /jpeg|jpg|png|gif/; // add or remove allowed file types here

// set storage engine
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename(req, file, callback) {
    const filenameObj = path.parse(file.originalname);
    callback(null, `${filenameObj.name}-${Date.now()}${filenameObj.ext}`);
  },
});

// check upload file extension and mime type

// eslint-disable-next-line consistent-return
function checkFileType(file, callback) {
  const extensionAllowed = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeTypeAllowed = allowedFileTypes.test(file.mimetype);
  if (extensionAllowed && mimeTypeAllowed) {
    return callback(null, true);
  }
  callback('Error: Image files only!');
}

// init upload
const upload = multer({
  storage,
  limits: { fileSize: fileSIzeByteLimit },
  fileFilter(req, file, callback) {
    checkFileType(file, callback);
  },
});

// init express server

const app = express();

const port = 3000;

// set EJS as template view engine
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(partials());

// use a public folder for static elements
app.use(express.static('./public'));

// render index page on GET requests to root
app.get('/', (req, res) => res.render('index'));

// capture POST requests to /upload
app.post('/upload', (req, res) => {
  upload.single('filename')(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
      });
    } else if (req.file === undefined) {
      res.render('index', {
        msg: 'Error: please select an image file',
      });
    } else {
      res.render('index', {
        msg: 'File uploaded.',
        file: `uploads/${req.file.filename}`,
      });
    }
  });
});

// handle uncaptured routes
// TODO: redirect with message to index?
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => console.log(`Server running on port ${port}.`));
