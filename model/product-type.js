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
        },
        status: {
            type: DataTypes.STRING
        },
        list_category:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        }
    }, {
        sequelize,
        tableName: 'product_type',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    ProductType.associate = (models) => {
        ProductType.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'product_type_id'
        })
    }
    return ProductType;
}
