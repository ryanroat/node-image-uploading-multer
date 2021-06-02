/* eslint-disable linebreak-style */

// dependencies
import express from 'express';
import ejs from 'ejs';
import multer from 'multer';
import path from 'path';

// init express server

const app = express();

const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}.`));
