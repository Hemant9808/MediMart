const { addToCart, removeItemFromCart, getUserCart } = require("../controllers/CartController");
const { protect } = require("../middlewares/authMiddleware");
const express = require('express')
const router = express.Router();
 router.post('/addToCart',protect,addToCart);
 router.delete('/removeItemFromCart/:productId',protect,removeItemFromCart);
 router.get('/getUserCart',protect,getUserCart);



 module.exports= router