const {Orders, Users, OrderDetail, Products} = require('../model');

const createOrder = async (req, res) => {
    try {
        const {first_name, last_name, phone, address,message, list_product} = req.body;
        if (list_product.length === 0){
            return res.status(400).json({success: false, message: "You have not entered the product you want to buy"});
        }
        const user = await Users.create({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            address: address,
            role: 'customer'
        });
        const order = await Orders.create({
            status: 'NEW',
            message: message,
            user_id: user.id
        });
        for (let product of list_product){
            await OrderDetail.create({
                order_id: order.id,
                product_id: product.id,
                quantity: product.quantity
            });
            const item  = await Products.findByPk(product.id);
            await Products.update({
                quantity: (item.quantity - product.quantity)
            }, {
                where: {id: product.id}
            });
        }
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getOrder = async (req, res) => {
    try {
        const options = {
            include: [
                {
                    model: Orders,
                    as: 'orders',
                    include: [
                        {
                            model: OrderDetail,
                            as: 'order_detail',
                            attributes: ['id', 'product_id', 'quantity']
                        },
                    ]
                }
            ],
            attributes: ['id', 'first_name', 'last_name', 'phone','address'],
            order: [ [ 'created_at', 'DESC' ]],
            where: {role: 'customer'}
        }
        const orders = await Users.findAll(options);
        return res.status(200).json(orders);
    }catch (err) {
        return res.status(400).json(err);
    }
}
const updateStatusOrder = async (req, res) => {
    try {
        const {status} = req.body;
        const {order_id} = req.params;
        await Orders.update({
            status: status
        }, {
            where: {id: order_id}
        });
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}

const deleteOrder = async (req, res) => {
    try {
        const {order_id} = req.params;
        const order = await Orders.findByPk(order_id);
        if (!order){
            return res.status(400).json({success: false, message: "order not exists!"});
        }
        await OrderDetail.destroy({where: {order_id: order_id}})
        await Orders.destroy({where: {id: order_id}});
        await Users.destroy({where: {id: order.user_id}});
        return res.status(200).json({success: true});
    }catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    createOrder,
    getOrder,
    updateStatusOrder,
    deleteOrder
}
