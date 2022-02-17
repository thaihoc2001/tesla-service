'use strict'

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Images extends Model {}
    Images.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: DataTypes.STRING
        },
        cloudinary_id: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        product_id: {
            type: DataTypes.BIGINT
        }
    }, {
        sequelize,
        tableName: 'images',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Images;
}
