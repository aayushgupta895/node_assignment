const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const { BookAllocationDetails, UserDetails } = require('./mongoSchema')

async function createUser(req, res){
    try {
         const userName = req.body.userId;
       
        const newDoc = await UserDetails.find({userId : userName});
        console.log(newDoc.length)
         if(newDoc.length != 0){
              return res.send({
                   error : "user name already taken"
              })
         }
        //  console.log("hi")
         const body = req.body;
         body['hash'] = await bcrypt.hash(req.body.password, 10);
         
         const newUser = await UserDetails.create({
              firstName : body.firstName,
              surName : body.surName,
              userId : userName,
              password : body.hash
         });
         req['Authenticated'] = true;
        //  console.log("hi")
         
         return res.status(201).send({message : "successful"});
    } catch (err) {
         console.log(err);
         return res.status(500).send({
              error : "internal server error"
         })
    }
}

async function login(req, res, next){
    try {
         console.log('here')
         const userName = req.body.userId
         const newDoc = await UserDetails.find({userId : userName});
         console.log(newDoc)
         if(newDoc.length == 0){
              return res.send({
                   error : "Auth failed"
              })
         }
         console.log(req.body.password, newDoc[0]['password']);
         const userRegistered = await bcrypt.compare(req.body.password, newDoc[0]['password']);
         console.log(userRegistered)
         if(userRegistered){
              const token = jwt.sign({
                   userId : newDoc.UserId,
              },
              process.env.SECRET_KEY,
              {
              expiresIn : "1h"
              })
              req['Authenticated'] = true;
              res.send({
                   status : "auth successful",
                   token : token
              });
          //     next();
         }
         
    } catch (error) {
         console.log(error)
         return res.send({
              error : "internal server error"
         })
    }
    
}




async function feedBookDetails(req, res){
     try {
          const userId = req.params.userId;
          const docs = await BookAllocationDetails.find({userId : userId});
          // console.log(docs.lenght)
          if(docs.length != 0){
               return res.send({
                    message : "entry already exist"
               })
          }
          const body = req.body;
          const newDoc = await BookAllocationDetails.create({
               userId : userId,
               totalBooks : body.totalBooks,
               serialNo : [...body.serialNo],
               bookWorth : body.bookWorth,
          })
          res.send({
               message : "entry created",
               detail : newDoc});
     } catch (error) {
          console.log(error);
          return res.send({
               error : "Internal server error"
          })
     }
}

async function getBookDetails(req, res){
     try {
          const userId = req.params.userId;
          const doc = await BookAllocationDetails.find({userId : userId})
          if(doc.length == 0){
               return res.send({
                    message : "Not allocated any book tilll now"
               })
          }
          return res.send(doc)
     } catch (error) {
          console.log(error)
          return res.send({
               error : "internal server error"
          })
     }
}

async function addBooks(req, res){
     try {
          const userId = req.params.userId;
          const body = req.body
          //can be used only if user has an entry and you want to modify it
          const doc = await BookAllocationDetails.findOneAndUpdate({userId : userId},{$inc: { totalBooks:  body['totalBooks']}, $push: { serialNo: {$each : [...body.serialNo]} }},{upsert : false, new : true});
          return res.send(doc)
          
     } catch (error) {
          console.log(error)
          return res.send({
               error : "internal server error"
          })
     }
}

async function deleteBookDetails(req, res){
     try {
          const userId = req.params.userId;
          const doc =  await BookAllocationDetails.findByIdAndDelete({userId : userId});
          return res.send(doc);
     } catch (error) {
          console.log(error)
          return res.send({
               error : "internal server error"
          })
     }
}

module.exports = {
     createUser,
     deleteBookDetails,
     feedBookDetails,
     login,
     getBookDetails,
     addBooks,
 }