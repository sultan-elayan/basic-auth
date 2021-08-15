'use strict';

require('dotenv').config();
const server = require('./scr/server');
const {db} = require('./scr/models/index');

db.sync()
  .then(() => {
    server.start(5000, () => console.log('server up'));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });
