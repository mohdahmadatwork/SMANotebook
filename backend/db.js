const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://ahmad:Ahm%409652@cluster0.0mq4t7e.mongodb.net/SMANews?tlsCertificateKeyFilePassword=Ahm%409652"
mongoose.set('strictQuery', true);
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })

}


module.exports = connectToMongo;