'use strict' 

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {Users}=require('../models/index')



const signUpMiddleware =async (req,res,next)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await Users.create(req.body);
        res.status(200).json(record);
      } catch (e) { res.status(403).send("Error Creating User"); }
}


const signInMiddleware =async (req,res,next)=>{

    if (req.headers['authorization']) {
        let basicHeaderParts = req.headers.authorization.split(' '); 
        let encoded = basicHeaderParts.pop();
        let decoded = base64.decode(encoded); 
        let [username, password] = decoded.split(":"); 
        req.username=username
       
       try {
      
           const user = await Users.findOne({ where: {username: req.username} });
           const valid = await bcrypt.compare(password, user.password);
           req.user=user
            if (valid) {
         
                next();
                
            } else {
              
                next('Invalid UserName and Password')
            }
       } catch(e) {
          
        next('error in signing in ')
      
       }
    }
}

module.exports={signUpMiddleware: signUpMiddleware,signInMiddleware}