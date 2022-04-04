const {ProductType,Products, Categories} = require('../model');
const createProductType = async (req, res) => {
    try {
        const {name, description, status} = req.body;
        const productType = await ProductType.create({
            name,
            description,
            status
        });
        return res.status(200).json(productType);
    }catch (err) {
        return res.status(400).json(err);
    }
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
        const {name, description, status} = req.body;
        await ProductType.update({
            name: name || productType.name,
            description: description || productType.description,
            status: status || productType.status
        },{
            where: {id: productType_id}
        });
        const productTypeNew = await ProductType.findByPk(productType_id);
        return res.status(200).json(productTypeNew);
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
        if (Object.keys(products).length !==0) {
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
const updateListCategoryOfProductType = async (category_id,type_id) => {
    const type = await ProductType.findByPk(type_id);
    const category = await Categories.findByPk(category_id);
    let array = type.list_category;
    if (array !== null){
        const result = array.find(({ id }) => id === category_id);
        if (!result){
            array.push({id: category_id, name: category.name});
            await ProductType.update({
                list_category: array
            },{
                where: {id: type_id}
            });
        }
    }else {
        array = [];
        array.push({id: category_id, name: category.name});
        await ProductType.update({
            list_category: array
        },{
            where: {id: type_id}
        });
    }
}
module.exports = {
    createProductType,
    getProductType,
    updateProductType,
    deleteProductType,
    updateListCategoryOfProductType
}
