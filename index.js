const express = require('express')
const data = require('./data');
const cors = require('cors');
const dotenv = require ('dotenv');

const bcrypt = require("bcryptjs");

require('./db/config')

const Items = require('./db/model/Items')
const User = require('./model/userModel');

const app = express();

app.use(express.json());
app.use(cors());

const PORT =  process.env.PORT ||  4500;


app.post('/user/signUp' ,  async (req , resp) =>{
    // check valid data
    // check allready Admin exitc Admin
    // hased password
    // save the Admin
    try{
        let  {email , password} = req.body;
        
        // check valid data
        if(!email || !password){
            return resp.send({error : "invalid data"});
        }
        
        // check allready Admin exitc Admin
        let admin = await User.findOne({email : email});
        if(admin){
            return  resp.send({error : "Admin already signUp"});
        }
        
        // hased password
        let hashedPassword = await bcrypt.hash(password  , 12);
        
        console.log(req.body);
       // save the Admin
       let newAdmin = await User({email : email , password : hashedPassword , cart : []});
      //  let newAdmin = await Admin({email : email , password : password , name : name})
       await newAdmin.save();
       resp.send({status : "ok"});

    }catch(error){
       return resp.send({ error : "signUp failed"});  
    }
});


app.get('/user/login/:email/:password' , async(req , resp)=>{
    try{
        let {email , password} = req.params;


        if(!email || !password){
          return resp.send({error : "invalid data"});
        }
 
 
        let user_exit =  await User.findOne({email : email});
    
 
        if(!user_exit){
            return resp.send({error : "worng email"});
        }
 
        let verifyPassword = await bcrypt.compare(password , user_exit.password);

 
        if(!verifyPassword){
          return resp.send({error : "worng password"});
        }
 
        user_exit.password = "";
 
        resp.send(user_exit);
    }catch(error){
        resp.send({error : "user login fail"});
    }
})








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

app.put('/user/addCart/:email' , async(req , resp)=>{
    try{
         
        let user = await User.findOne({email : req.params.email});
        let cart = user.cart;

        console.log(cart);
        console.log(req.body);

        cart = [...cart , req.body];
        
        let result = await User.updateOne(
            {email : req.params.email},
            {$set : {cart : cart}}
            );
            
          resp.send(result);
    }catch(error){
        resp.send({error :"add cart fail"});
    }
})


app.put('/update_qunity/:email/:cartItemId' , async(req , resp)=>{
    try{
        let user = await User.findOne({email : req.params.email});


        if(!user){
            return resp.send({error : "invalid email"});
        }

        let idx = 0;
        for(i=0;i<user.cart.length;i++){
            if(user.cart[i]._id == req.params.cartItemId){
                idx = i;
                break;
            }
        }
        user.cart[idx].quintity++;
        console.log(user.cart[idx]);
        let result  = await User.updateOne(
            {email : req.params.email},
            {$set : {cart : user.cart}}
        )
        

        resp.send(result);
    }catch(error){
        resp.send({error : "usdate cart qunity fail"});
    }
})

app.put('/user/cartRemove/:email/:id' , async(req , resp)=>{
    try{
        let user = await User.findOne({email : req.params.email});


        if(!user){
            return resp.send({error : "invalid email"});
        }

      
    user.cart = user.cart.filter((c)=>c._id != req.params.id);
    let result  = await User.updateOne(
        {email : req.params.email},
        {$set : {cart : user.cart}}
        )
        
        resp.send(result);
    }catch(error){
       resp.send({error : 'cart emove error'});
    }
})








app.listen(PORT , ()=>console.log(PORT));

