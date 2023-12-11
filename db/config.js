const mongoose = require('mongoose')
require('dotenv').config();

try{

    //   mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASWORD}@food.yjxwiii.mongodb.net/?retryWrites=true&w=majority`)
      mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASWORD}@cluster0.vsjcsrk.mongodb.net/yammi?retryWrites=true&w=majority`)
    console.log("conntect")
}catch(error){
    console.log(error)
}