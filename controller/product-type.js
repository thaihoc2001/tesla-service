const {ProductType,Products, Categories} = require('../model');
const createProductType = async (req, res) => {
    try {
        const {name, description, status} = req.body;
        await ProductType.create({
            name,
            description,
            status,
            list_category_id: []
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const updateListCategory = async (productType_id,category_id) => {
    const productType = await ProductType.findByPk(productType_id);
    const list = productType.list_category_id;
    if (list.indexOf(category_id) === -1){
        list.push(category_id);
    }
    await ProductType.update({
        list_category_id: list
    },{
        where: {id: productType_id}
    });
}
const getProductType = async (req, res) => {
    try {
        const productType = await ProductType.findAll();
        if (!productType) throw Error("Error!");
        return res.status(200).json(productType);
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
        const productType = await ProductType.findAll();
        for (let type of productType){
            const categories = [];
            for (let item of type.list_category_id){
                const category = await Categories.findByPk(item);
                categories.push({
                    id: category.id,
                    name: category.name
                })
            }
            listProductType.push({
                id: type.id,
                name: type.name,
                categories: categories
            })
        }
        return res.status(200).json(listProductType);
    }catch (err) {
        return res.status(400).json(err.toString());
    }
}
module.exports = {
    createProductType,
    getProductType,
    updateProductType,
    deleteProductType,
    getCategoriesOfProductType,
    updateListCategory
}
