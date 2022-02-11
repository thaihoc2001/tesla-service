const express = require('express');
const shortid = require('shortid');
const productTypeModel = require('../model/product-type')

module.exports.createProductType = async (req, res) => {
    try {
        const body = req.body;
        const newProductType = new productTypeModel({
            product_type_id: shortid.generate(),
            product_type_name: body.product_type_name,
            description: body.description
        })
        console.log('oke')
        console.log(newProductType);
        const productType = await newProductType.save();
        if(!productType) throw Error('Don\'t save product type');
        res.status(200).json(productType);
    }catch (err){
        res.status(400).send(err);
    }
}

module.exports.getProductType = async (req, res) => {
    try {
        const productType = await productTypeModel.find();
        if(!productType) throw Error('product is null');
        res.status(200).json(productType);
    }catch (err){
        res.status(400).send(err);
    }
}
