const Order = require('../models/OrderModel');

const createOrder = async(req, res) => {
    
    // console.log("req.user",req.user);
    
    
    const { items, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice,razorpay_order_id } = req.body;
    console.log("entered",razorpay_order_id);
    if (items && items.length === 0) {
      res.status(400);
      throw new Error('No order items');

      return;
    }
  
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      razorpay_order_id
    });
  
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}


const updateOrderToPaid = async (req, res) => {
  console.log('enterd in updateOrderToPaid');
  const {razorpay_order_id}= req.body;
  const order = await Order.findOne({razorpay_order_id:razorpay_order_id});

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      razorpay_payment_id:req.body.razorpay_payment_id || order.paymentResult.razorpay_payment_id,
      status:true,
      paidAt:Date.now(),
      
      paymentMethod:'credit_card',     
    };

    const updatedOrder = await order.save();
    console.log("updatedOrder",updatedOrder);
    
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}


const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}


const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
}


const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
}

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
};
