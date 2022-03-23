'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model { }

    Users.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        ward_id: {
            type: DataTypes.BIGINT
        },
        role: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'users',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    Users.associate = (models) => {
        Users.hasOne(models.Orders, {
            as: 'orders',
            foreignKey: 'user_id'
        });
        Users.hasOne(models.Account,{
            as: 'account',
            foreignKey: 'user_id'
        })
    }
    return Users;
};
