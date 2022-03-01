const {ProductType,Products, Categories} = require('../model');
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
const getCategoriesOfProductType = async (req, res) => {
    try {
        let listProductType = [];
        const list_product_type = await ProductType.findAll();
        for (let product_type of list_product_type){
            let categories = [];
            const list_category_id = [];
            const options = {
                attributes: ['category_id'],
                where: {product_type_id: product_type.id}}
            const products = await Products.findAll(options);
            for (let product of products){
               if (list_category_id.indexOf(product.category_id) === -1){
                   list_category_id.push(product.category_id);
               }
            }
            for (let id of list_category_id){
                const category = await Categories.findOne({
                    attributes: ['id','name'],
                    where: {id: id}
                });
                categories.push(category);
            }
            listProductType.push({
                id: product_type.id,
                name: product_type.name,
                categories: categories
            })
        }
        return res.status(200).json(listProductType);
    }catch (err) {
        return res.status(400).json(err);
    }
}
module.exports = {
    createProductType,
    getProductType,
    updateProductType,
    deleteProductType,
    getCategoriesOfProductType
}
