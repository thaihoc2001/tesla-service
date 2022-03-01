'use strict'
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {}
    Orders.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT
        },
        status: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'orders',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Orders;
}
