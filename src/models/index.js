'use strict';

require('dotenv').config();

const {Sequelize, DataTypes} = require('sequelize');
const user = require('./user.model');
const img = require('./img.model');
// const Collection = require('./collection-class');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL; 

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};


let sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);

let userModel = user(sequelize,DataTypes);
let imgmodel = img(sequelize,DataTypes)
// let userCollect = new Collection(userModel);


module.exports = {
    db: sequelize,
    User: userModel,
    img:imgmodel
    // userCollection:userCollect    
}