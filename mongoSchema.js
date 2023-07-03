const mongoose = require('mongoose')

const userDetails = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    surName : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

const bookAllocationDetails = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    totalBooks : {
        type : Number,
        required : true
    },
    serialNo : {
        type : [],
    },
    bookWorth : {
        type :  Number
    }
})


let BookAllocationDetails = mongoose.model("bookAllocationDetails", bookAllocationDetails)
let UserDetails = mongoose.model("userDetail", userDetails);

module.exports = {
    BookAllocationDetails,
    UserDetails,
}