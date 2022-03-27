const {ProductDetail} = require('../model');

const createProductDetail = async (req, res) => {
    try {
        const {product_id, brake, rim, battery, capacity, power, dimension, range, charging, weight} = req.body;
        const product_detail = await ProductDetail.create({
            product_id,
            brake,
            rim,
            battery,
            capacity,
            power,
            dimension,
            range,
            charging,
            weight
        });
        return res.status(200).json(product_detail);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const updateProductDetail = async (req, res) => {
    try {
        const {brake, rim, battery, capacity, power, dimension, range, charging, weight} = req.body;
        const {product_id} = req.params;
        const productDetail = await ProductDetail.findOne({where: {product_id: product_id}});
        if (!productDetail){
            return res.status(400).json({success: false, message: 'product detail not exists!'});
        }
        await ProductDetail.update({
            brake: brake || productDetail.brake,
            rim: rim || productDetail.rim,
            battery: battery || productDetail.battery,
            capacity: capacity || productDetail.capacity,
            power: power || productDetail.power,
            dimension: dimension || productDetail.dimension,
            range: range || productDetail.range,
            charging: charging || productDetail.charging,
            weight: weight || productDetail.weight
        },{
            where: {product_id: product_id}
        });
        const productDetailNew = await ProductDetail.findOne({where: {product_id: product_id}});
        return res.status(200).json(productDetailNew);
    }catch (err) {
        return res.status(400).json(err);
    }
}
module.exports = {
    createProductDetail,
    updateProductDetail
}
