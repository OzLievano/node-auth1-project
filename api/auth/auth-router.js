const router = require('express').Router();

const bcrypt = require('bycryptjs');

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