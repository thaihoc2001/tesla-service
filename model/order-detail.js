'use strict'

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {}
    OrderDetail.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.BIGINT
        },
        product_id: {
            type: DataTypes.BIGINT
        },
        quantity: {
            type: DataTypes.BIGINT
        }
    }, {
        sequelize,
        tableName: 'order-detail',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return OrderDetail;
}
