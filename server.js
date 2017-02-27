"use strict";

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const heartbank = require('heartbank')(process.env.DEVELOPER_KEY, process.env.DEVELOPER_SECRET, process.env.LOCALHOST);

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended:false});

//app.use(express.static('images'));
app.use(cookieParser());
app.set('view engine', 'ejs')

require('./controllers/index')(app);
require('./controllers/clients')(heartbank, app, urlencodedParser);
require('./controllers/users')(heartbank, app);

const server = app.listen(process.env.PORT, () => {
   const host = server.address().address;
   const port = server.address().port;
   //console.log("Example app listening at http://%s:%s", host, port);
})
