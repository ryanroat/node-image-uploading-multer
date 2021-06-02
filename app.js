/* eslint-disable linebreak-style */

// dependencies
import express from 'express';
import ejs from 'ejs';
import multer from 'multer';
import path from 'path';

// set storage engine
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// init upload
const upload = multer({ storage });

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

// test POST request to /upload
app.post('/upload', upload.single('filename'), (req, res) => {
  console.log(req.file, req.body);
});

// // capture POST requests to /upload
// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.render('index', {
//         msg: err,
//       });
//     } else {
//       console.log(req);
//       res.send('test');
//     }
//   });
// });

// TODO: need to catch 404 after all other paths

app.listen(port, () => console.log(`Server running on port ${port}.`));
