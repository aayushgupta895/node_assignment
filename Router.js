const express = require('express');

const {isAuthenticated} = require('./Auth.middleware');
const { Login, CreateUser, FeedBookDetails, GetBookDetails, AddBooks, DeleteBookDetails } = require('./controller.js/Auth.controller');

const router = express.Router();

//--------------------for login---------------------

router.post('/login/', Login) ;

//--------------------------creating the user -------------------------

router.post('/createUser/', CreateUser);



router.post('/auth', isAuthenticated, (req, res)=>{
    res.send({message : 'auth successful'});
})

//---------------------to input user book details------------------

router.post('/bookDetails/:userId', isAuthenticated, FeedBookDetails);


//---------------------get the details of book allocated to the user------------------

router.get('/bookDetails/:userId', isAuthenticated, GetBookDetails);

//---------------------------add books-----------------------

router.post('/addBooks/:userId', isAuthenticated,  AddBooks);

//---------------------------add books-----------------------

router.get('/deleteBooks/:userId', isAuthenticated,  DeleteBookDetails);

module.exports = router

