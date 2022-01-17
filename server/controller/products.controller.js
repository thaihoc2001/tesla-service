const express = require('express');
const cloudinary = require('../utils/cloudinary');
const productModel = require('../model/products.model')
const imageProduct = require('../model/data_type/imagesProduct.model')
const shortid = require('shortid');

// create product
module.exports.postProduct = async (req, res) => {
    try {
        const body= req.body;
        const productId = shortid.generate();
        console.log(req.files);
        const Images = {
            Array_Img : String,
            Array_CloudinaryId: String,
            product_id: String,
        }
        const images = [];
        const list_promotion_id = [];
        for(const file of req.files){
            const result = await cloudinary.uploader.upload(file.path);
            console.log(result);
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
        console.log(images)
        const newProduct = new productModel({
            product_id: productId,
            product_name: body.product_name,
            price_value: body.price_value,
            discount: body.discount,
            images: images,
            description: body.description,
            start_date: body.start_date,
            list_promotion_id: body.list_promotion_id,
            product_category_id: body.product_category_id,
            product_type_id: body.product_type_id
        })
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
