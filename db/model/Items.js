const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	dishCategory : {
        type : String,
        require :true
    },
    dishName : {
        type : String,
        require : true
    },
    dishPrice : {
        type : Number,
        require : true
    },
    dishImage : {
        type : String,
        require : true
    },
    dishRating : {
        type : String,
        require : true
    },
    quintity : {
        type : Number,
        require : true
    }
})

module.exports = mongoose.model('Items' , ItemSchema);