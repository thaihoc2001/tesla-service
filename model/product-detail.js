'use strict'
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductDetail extends Model{}
    ProductDetail.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.BIGINT
        },
        brake: {
            type: DataTypes.STRING
        },
        rim: {
            type: DataTypes.STRING
        },
        battery: {
            type: DataTypes.STRING
        },
        capacity: {
            type: DataTypes.STRING
        },
        power: {
            type: DataTypes.STRING
        },
        dimension: {
            type: DataTypes.STRING
        },
        range: {
            type: DataTypes.STRING
        },
        charging: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.STRING
        }
    },{
        sequelize,
        tableName: 'product_detail',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return ProductDetail;
}
