const express = require('express');
const shortid = require('shortid');
const productCategoryModel = require('../model/products-category')

module.exports.createProductCategory = async (req, res) => {
    try {
        const body = req.body;
        const newProductCategory = productCategoryModel({
            products_category_id: shortid.generate(),
            product_category_name: body.product_category_name,
            description: body.description,
            product_type_id: body.product_type_id,
        })
        const productCategory = await newProductCategory.save();
        if(!productCategory) throw Error('Product Category don\'t save');
        res.status(200).json(productCategory);
    }catch (err){
        console.log(err)
        res.status(400).send(err);
    }
}

module.exports.getProductCategory = async (req, res) => {
    try {
        const body = req.body;
        const productCategory = await productCategoryModel.find();
        if(!productCategory) throw Error("Product category is null");
        res.status(200).json(productCategory)
    }catch (err){
        res.status(400).send(err);
    }
}
