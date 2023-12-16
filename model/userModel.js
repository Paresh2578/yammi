const mongoose = require('mongoose');

 let useSchema = new mongoose.Schema({
    email : {
      type : String,
      required : true
    },
    password : {
      type : String,
      required : true
    },
    cart : [
       {
        dishCategory:  {type : String, required : true},
        dishName: {type : String, required : true},
        dishPrice: {type : Number, required : true}, 
        dishImage :{type : String, required : true},
        dishRating :{type : String, required : true},
        quintity :{type : Number, required : true}
        }
    ]
 })

 module.exports = new mongoose.model("users" , useSchema);