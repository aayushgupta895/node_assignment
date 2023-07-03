const  mongoose  = require("mongoose");
require('dotenv').config()

mongoose.connection.once('open', () =>{
    console.log("connection is ready to rock")
})

mongoose.connection.on('error', (err) =>{
    console.log(`MongoDb connection error ${err}`)
})


async function connectMongo(){
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    
} 


async function disconnectMongo(){
    await mongoose.disconnect()
}

module.exports = {
    connectMongo,
    disconnectMongo,
   
}