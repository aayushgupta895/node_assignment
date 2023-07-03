const { 
    createUser,
    login,
    feedBookDetails,
    getBookDetails,
    deleteBookDetails,
    addBooks,
    } = require('../model')


async function Login(req, res){
    await login(req, res);
}

async function CreateUser(req, res){
   await createUser(req, res);
}

async function FeedBookDetails(req, res){
    await feedBookDetails(req, res);
}

async function GetBookDetails(req, res){
    await getBookDetails(req, res);
}

async function AddBooks(req, res){
    await addBooks(req, res);
}

async function DeleteBookDetails(req, res){
    await deleteBookDetails(req, res);
}

module.exports = {
    Login, 
    CreateUser,
    GetBookDetails,
    FeedBookDetails,
    AddBooks,
    DeleteBookDetails
}