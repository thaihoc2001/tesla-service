'use strict'
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductType extends Model {}
    ProductType.init({
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
        }
    }, {
        sequelize,
        tableName: 'product-type',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return ProductType;
}
