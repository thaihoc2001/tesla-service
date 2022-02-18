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
        status: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'categories',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    Categories.associate = (models) => {
        Categories.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'category_id'
        });
    }
    return Categories;
}
