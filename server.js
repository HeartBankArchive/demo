"use strict";

require('dotenv').config();
const heartbank = require('heartbank')(process.env.DEVELOPER_KEY, process.env.DEVELOPER_SECRET, process.env.LOCALHOST);
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('images'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'images/'}).single('media'));
app.use(cookieParser());

require('./controllers/index')(app);
require('./controllers/clients')(heartbank, app);
require('./controllers/users')(heartbank, app);
require('./controllers/branches')(heartbank, app);
require('./controllers/customers')(heartbank, app);
require('./controllers/transactions')(heartbank, app);
require('./controllers/recurrences')(heartbank, app);
require('./controllers/subscriptions')(heartbank, app);
require('./controllers/payments')(heartbank, app);

const server = app.listen(process.env.PORT, () => {
   const host = server.address().address;
   const port = server.address().port;
   //console.log("Example app listening at http://%s:%s", host, port);
})
