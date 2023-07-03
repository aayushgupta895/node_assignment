const express = require('express')
const Router = require('./Router')
const { connectMongo } = require('./mongo')
const app = express();
const PORT = 3500
app.use(express.json());

app.use('/', Router);

async function connectingMongo(){
    await connectMongo()
}

async function startServer(){
    await connectingMongo() 
    app.listen(PORT, ()=>{ console.log(`listening on the port ${PORT}`)})
}


startServer().catch(e=>console.log(e));

app.listen(3000); 