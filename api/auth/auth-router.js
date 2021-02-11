const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');



// create a user and use a hash to hide the password on creation
router.post('/register',function registerUser(req,res){
    let user = req.body;

    const hash = bcrypt.hashSync(user.password,12)

    user.password = hash;

    Users.add(user)
        .then((users)=>{
            res.status(201).json(user);
        })
        .catch((err)=>{
            res.status(500).json({error:err.message})
        })
})

//verify that login works 

router.post('/login', async(req,res)=>{
    let {username,password}= req.body;

    try{
        const user = await Users.findBy({username}).first();

        console.log(user)
        if(user && bcrypt.compareSync(password,user.password)){
            req.session.user = user;
            res.status(200).json({message:"WELCOME TO THE THUNDERDOME"})
        }else{
            res.status(401).json({message:"invalid credentials"})
        }
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports = router;