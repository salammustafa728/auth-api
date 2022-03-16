'use strict';

const express = require("express");
const imgRouter = express.Router();
const models = require('../../models');
const bearer = require('../../middleware/bearer');
const acl = require('../../middleware/acl');
const {clothes, User} = require('../../models/index')

imgRouter.param("model",(req,res,next)=>{
    console.log('tttttttt',req.params.model);
    if (models[req.params.model]) {
        req.model = models[req.params.model];
        next()
    } else {
        next('invalid input')
    }
})

imgRouter.post('/:model',bearer(User),acl('create'),async(req,res)=>{
    let createdData = await req.model.createRecord(req.body);
    res.status(201).send(createdData);
})

imgRouter.get('/:model',bearer(User),acl('read'),async(req,res)=>{
    let allData = await req.model.readRecord();
    res.status(200).send(allData);

})
imgRouter.get('/:model/:id',bearer(User),acl('read'),async(req,res)=>{
    let id = req.params.id;
    let oneData = await req.model.readRecord(id);
    res.status(200).send(oneData);

})

imgRouter.put('/:model/:id',bearer(User),acl('update'),async(req,res)=>{
    let objectData =req.body;
   let id = req.params.id;
    let updateData = await req.model.updateRecord(objectData,id);
    res.status(201).send(updateData);

})
imgRouter.delete('/:model/:id',bearer(User),acl('delete'),async(req,res)=>{
    let { id } = req.params;
    await req.model.removeRecord(id);
    res.status(204).send("removed Data");
})
module.exports = imgRouter