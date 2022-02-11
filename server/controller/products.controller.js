const express = require('express');
const cloudinary = require('../utils/cloudinary');
const productModel = require('../model/products.model')
const imageProduct = require('../model/data_type/imagesProduct.model')
const shortid = require('shortid');

// create product
module.exports.postProduct = async (req, res) => {
    try {
        const body= req.body;
        const date = new Date();
        const productId = shortid.generate();
        console.log(req.files);
        const images = [];
        let imageThumbnail = '';
        for(const file of req.files){
            const result = await cloudinary.uploader.upload(file.path);
            if(file.fieldname === 'image_thumbnail'){
                const newImageThumbnail = {
                    Array_Img : result.secure_url,
                    Array_CloudinaryId: result.public_id,
                }
                imageThumbnail = newImageThumbnail;
            }else{
                if(result){
                    const newImageProduct = {
                        Array_Img : result.secure_url,
                        Array_CloudinaryId: result.public_id,
                    }
                    if(newImageProduct){
                        images.push(newImageProduct);
                    }
                }
            }
        }
        console.log(images)
        const newProduct = new productModel({
            product_id: productId,
            product_name: body.product_name,
            price_value: body.price_value,
            discount: body.discount,
            images: images,
            description: body.description,
            start_date: date,
            list_promotion_id: body.list_promotion_id,
            product_category_id: body.product_category_id,
            product_type_id: body.product_type_id,
            image_thumbnail: imageThumbnail,
        })
        console.log(newProduct);
        const product = await newProduct.save();
        if(!product) throw Error('Post product fail');
        res.status(200).json(product);
    }catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}

// get all product
module.exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        if(!products) throw Error("Product is null");
        res.status(200).json(products)
    } catch (err) {
        res.status(400).send({
            message: err,
            success: false
        })
    }
}

module.exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(productId);
        const product = await productModel.find({product_id: productId});
        console.log(product);
        if(!product) throw Error("Product is null");
        res.status(200).json(product)
    } catch (err) {
        res.status(400).send({
            message: err,
            success: false
        })
    }
}


module.exports.getProductsByType = async (req, res) => {
    try {
        const body= req.body;
        const productByType = await productModel.find({product_type_id: body.product_type_id});
        if(!productByType) throw Error("Product by type is null");
        res.status(200).json(productByType)
    } catch (err) {
        res.status(400).send({
            message: err,
        })
    }
}

module.exports.getProductsByCategory = async (req, res) => {
    try {
        const body= req.body;
        const productByCategory = await productModel.find({product_category_id: body.product_category_id});
        if(!productByCategory) throw Error("Product by category is null");
        res.status(200).json(productByCategory)
    } catch (err) {
        res.status(400).send({
            message: err,
        })
    }
}

