'use strict';

const express = require("express");
const imgRouter = express.Router();
const models = require('../../models');
const bearer = require('../../middleware/bearer');
const acl = require('../../middleware/acl');
const {User} = require('../../models/index')

imgRouter.param("model",(req,res,next)=>{
    console.log("1111",req.params.model);
    if (models[req.params.model]) {
        req.model = models[req.params.model];
        next()
    } else {
        next('invalid input')
    }
})


imgRouter.post('/:model',bearer(User), acl('read'),async(req,res)=>{
    let createdData = await req.model.create(req.body);
    res.status(201).send(createdData);
})

imgRouter.get('/:model',bearer(User), acl('create'),async(req,res)=>{
    let allData = await req.model.findAll();
    res.status(200).send(allData);
});

imgRouter.get('/:model/:id',bearer(User), acl('read'),async(req,res)=>{
    let id = req.params.id;
    let oneData = await req.model.findOne({where:{id:id}});
    res.status(200).send(oneData);
})

imgRouter.put('/:model/:id',bearer(User), acl("update"),async(req,res)=>{
    let objectData =req.body;
    console.log(objectData,'ttttttttttttttttt');
    let id = req.params.id;
    let oneData = await req.model.findOne({where:{id:id}});
    let updateData = await oneData.update(objectData,{where:{id:id}});
    console.log(updateData,'uuuuuuuuuuuuu');
    res.status(201).send(updateData);

})
imgRouter.delete('/:model/:id', bearer(User), acl("delete"),async(req,res)=>{
    let id = parseInt(req.params.id);
    let  deletedData = await req.model.destroy({ where: { id: id } });
    res.status(204).send(deletedData);
})


module.exports = imgRouter