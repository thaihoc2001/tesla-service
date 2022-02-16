'use strict'
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {}
    Categories.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
        product_type_id: {
            type: DataTypes.BIGINT
        }
    }, {
        sequelize,
        tableName: 'categories',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Categories;
}
