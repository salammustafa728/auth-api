'use strict';

const chlothes = (sequelize, DataTypes) => sequelize.define('chlothes', {
    clothes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clothesInfo: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = chlothes;