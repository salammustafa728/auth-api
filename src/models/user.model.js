"use strict";

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'mysecret';

const UsersModel = (sequelize,DataTypes) =>{

const User =   sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
        defaultValue: 'user',
    },
    token: {
        type: DataTypes.VIRTUAL
    },
    actions: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                user: ['read'],
                writer: ['read', 'create'],
                editor: ['read', 'create', 'update'],
                admin: ['read', 'create', 'update', 'delete'],
            }
            return acl[this.role];
        }
    }
})

User.authenticateBasic = async function (username,password) {
    try {
        const user = await this.findOne({where:{username:username}});
        const valid = await bcrypt.compare(password,user.password);
        if(valid) {
            // let newToken = jwt.sign({username:user.username},SECRET);
            let newToken = jwt.sign({exp:Math.floor(Date.now()/1000)+900,username:user.username},SECRET);
            user.token = newToken;
            return user;
        } else {
            console.log('user is not valid');
            throw new Error('Invalid password');
        }
    } catch(error) {
       console.log('error ',error);
    }
}

User.validateToken = async function(token) {
    const parsedToken = jwt.verify(token,SECRET);
    console.log('parsedToken -->',parsedToken);
    const user = await this.findOne({where:{username:parsedToken.username}});
    if(user) {
        return user
    }
    throw new Error('invalid token')
}

return User;
}
module.exports = UsersModel;