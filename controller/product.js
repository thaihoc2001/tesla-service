const {Products,Images} = require('../model');
const {createImages,deleteImageOfProduct} = require('./image');

const createProduct = async (req, res) => {
    try {
        const {name, price_old, price_new, description,category_id,quantity, product_type_id} = req.body;
        const files = req.files;
        const product = await Products.create({
            name: String(name),
            price_old: Number(price_old),
            price_new: Number(price_new),
            description: String(description),
            category_id: Number(category_id),
            product_type_id: Number(product_type_id),
            quantity: Number(quantity)
        });
        if (!product) throw Error("Error!");
        await createImages(files, product.id);
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err.toString());
    }
}
const getProducts = async (req, res) => {
    try {
        const options = {
            include: [{
                model: Images,
                as: 'images'
            }],
            limit: 12,
            order: [ [ 'created_at', 'DESC' ]],
            attributes: ['id','name','price_old','price_new','description','category_id','product_type_id','status','quantity','created_at','updated_at']
        }
        const products = await Products.findAll(options);
        return res.status(200).json(products);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getSeeMoreProduct = async (req, res) => {
    try {
        const {count} = req.params;
        const options = {
            include: [{
                model: Images,
                as: 'images'
            }],
            attributes: ['id','name','price_old','price_new','description','category_id','product_type_id','status','quantity','created_at','updated_at'],
            limit: 12,
            offset: count,
            order: [ [ 'created_at', 'DESC' ]]
        }
        const products = await Products.findAll(options);
        return res.status(200).json(products);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getProductById = async (req, res) => {
    try {
        const {product_id} = req.params;
        const options = {
            include: [{
                model: Images,
                as: 'images'
            }],
            attributes: ['id','name','price_old','price_new','description','category_id','product_type_id','status','quantity','created_at','updated_at'],
            where: {id: product_id}
        }
        const product = await Products.findAll(options);
        return res.status(200).json(product);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getProductByCategory = async (req, res) => {
    try {
        const {category_id} = req.params;
        const options = {
            include: [{
                model: Images,
                as: 'images'
            }],
            attributes: ['id','name','price_old','price_new','description','category_id','product_type_id','status','quantity','created_at','updated_at'],
            where: {category_id: category_id}
        }
        const products = await Products.findAll(options);
        return res.status(200).json(products);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getProductByType = async (req, res) => {
    try {
        const {product_type_id} = req.params;
        const options = {
            include: [{
                model: Images,
                as: 'images'
            }],
            attributes: ['id','name','price_old','price_new','description','category_id','product_type_id','status','quantity','created_at','updated_at'],
            where: {product_type_id: product_type_id}
        }
        const products = await Products.findAll(options);
        return res.status(200).json(products);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const deleteProducts = async (req, res) => {
    try {
        const {product_id} = req.params;
        await deleteProduct(product_id);
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const deleteProduct = async (product_id) => {
    const product = await Products.findByPk(product_id);
    if (product){
        await deleteImageOfProduct(product_id);
        await Products.destroy({
            where: {id: product_id}
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const {name, price_old, price_new, description,category_id,quantity, product_type_id} = req.body;
        const {product_id} = req.params;
        const product = await Products.findByPk(product_id);
        if (!product_id){
            return res.status(400).json({success: false, message: "product not exists"});
        }
        await Products.update({
            name: name || product.name,
            price_old: price_old || product.price_old,
            price_new: price_new || product.price_new,
            description: description || product.description,
            category_id: category_id || product.category_id,
            quantity: quantity || product.quantity,
            product_type_id: product_type_id || product.product_type_id
        }, {
            where: {id: product_id}
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductByCategory,
    getProductByType,
    deleteProducts,
    deleteProduct,
    updateProduct,
    getSeeMoreProduct
}

