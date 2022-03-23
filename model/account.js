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
        },
        user_id: {
            type: DataTypes.BIGINT
        }
    },{
        sequelize,
        tableName: 'account',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Account;
}
