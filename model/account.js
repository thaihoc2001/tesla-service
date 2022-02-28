'use strict'
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) =>{
    class Account extends Model {}
    Account.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        password: {
            type: DataTypes.STRING
        }
    },{
        sequelize,
        tableName: 'account',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    Account.associate = (model) => {
        Account.hasOne(model.Users, {
            as: 'users',
            foreignKey: 'account_id'
        })
    }
    return Account;
}
