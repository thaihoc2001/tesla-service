const {Products} = require('../model');
const {createImages} = require('./image');

const createProduct = async (req, res) => {
    try {
        const {name, price_old, price_new, description,category_id, productType_id} = req.body;
        const files = req.files;
        const product = await Products.create({
            name: String(name),
            price_old: Number(price_old),
            price_new: Number(price_new),
            description: String(description),
            category_id: Number(category_id),
            product_type_id: Number(productType_id)
        });
        if (!product) throw Error("Error!");
        await createImages(files, product.id);
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err.toString());
    }
}
module.exports = {
    createProduct
}

