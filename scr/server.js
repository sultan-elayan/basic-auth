'use strict';
const express = require('express');
const app = express();
const errorHandler=require('./error-handlers/500');
const pageNotFound=require('./error-handlers/404'); 


app.use(express.json());

const {signInMiddleware,signUpMiddleware: signUpMiddleware }=require('./auth/middleware')
app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));
let  start = (port)=> {
    app.listen(port, ()=> console.log(`listening to port : ${port}`))
}

app.post('/signin', signInMiddleware , async  (req, res) => {
  res.status(200).json({username: req.username ,id :req.user.id})
 
});

app.post('/signup', signUpMiddleware , async  (req, res) => {

  res.status(201).json(req.record);
});


app.use('*',pageNotFound)
app.use(errorHandler)


module.exports = {start: start}