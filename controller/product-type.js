const {ProductType,Products} = require('../model');
const {deleteProduct} = require('./product')
const createProductType = async (req, res) => {
    try {
        const {name, description, status} = req.body;
        await ProductType.create({
            name,
            description,
            status
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getProductType = async (req, res) => {
    try {
        const categories = await ProductType.findAll();
        if (!categories) throw Error("Error!");
        return res.status(200).json(categories);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const updateProductType = async (req, res) => {
    try {
        const {productType_id} = req.params;
        const productType = await ProductType.findByPk(productType_id);
        if (!productType) {
            return res.status(400).json({success: false, message: "Product-type not exists"})
        }
        const {name, description} = req.body;
        await ProductType.update({
            name: name || productType.name,
            description: description || productType.description,
            status: status || productType.status
        },{
            where: {id: productType_id}
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const deleteProductType = async (req, res) => {
    try {
        const {productType_id} = req.params;
        const productType = await ProductType.findByPk(productType_id);
        if (!productType) {
            return res.status(400).json({success: false, message: "product_type not exists"})
        }
        const products = await Products.findAll({where: {product_type_id: productType_id}});
        if (products) {
            return res.status(400).json({success: false, message: 'need to delete all products in this category'});
        }
        await ProductType.destroy({
            where: {id: productType_id}
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
module.exports = {
    createProductType,
    getProductType,
    updateProductType,
    deleteProductType
}
