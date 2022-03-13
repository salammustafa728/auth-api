'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const {User} =require('../../models/index');
const router = express.Router();

router.post('/signup',signupFunc)

async function signupFunc(req,res){
    let userData = req.body;
    console.log(`${userData.username} and ${userData.password}`);
    try{
        let hasedPass = await bcrypt.hash(userData.password,5);
        console.log('after hashing>>>',hasedPass);
        userData.password=hasedPass;
        console.log('userDataddddddd ',userData);
        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    }catch (error){
        console.log(error);
    }
}

module.exports = router;
