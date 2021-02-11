const router = require('express').Router();
const Users = require('../users/users-model');


router.get('/', function getUsers(req,res){
    Users.find()
        .then((users)=>{
            res.status(200).json(users);
        })
        .catch((err)=>{
            res.status(500).json({error:"you shall not pass"})
        })
})

module.exports = router;