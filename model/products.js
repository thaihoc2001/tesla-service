'use strict'
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {}
    Products.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        price_old: {
            type: DataTypes.BIGINT
        },
        price_new: {
            type: DataTypes.BIGINT
        },
        description: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.BIGINT
        },
        product_type_id: {
            type: DataTypes.BIGINT
        },
        status: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.BIGINT
        }
    }, {
        sequelize,
        tableName: 'products',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    Products.associate = (models) => {
        Products.hasMany(models.Images, {
            as: 'images',
            foreignKey: 'product_id'
        })
    }
    return Products;
}
