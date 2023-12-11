const express = require('express')
const data = require('./data');
const cors = require('cors');
const dotenv = require ('dotenv');

// require('./db/config')

const Items = require('./db/model/Items')

const app = express();

app.use(express.json());
app.use(cors());

const PORT =  process.env.PORT ||  4500;


app.get('/' , async(req , resp)=>{
    try{
        // let result = await Items.find();

      resp.send(data);
    }catch(error){
        resp.status(500).json(error);
    }
})

app.get('/:dishCategory', async(req , resp)=>{
    // let result = await Items.find({dishCategory : req.params.dishCategory});
    let result = data.filter((dish)=> dish.dishCategory.toLowerCase() == req.params.dishCategory.toLowerCase());
    resp.send(result);
})

// app.post('/item/adds' , async(req , resp)=>{
//     try{
//        let result = await Items.insertMany(data)

//        resp.send(result);
//     }catch(error){
//         console.log(error);
//         // resp.status(500).json(error);
//     }
// } )



app.listen(PORT);

