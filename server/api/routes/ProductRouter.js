const { protect } = require("../middlewares/authMiddleware");

const { addProducts, getAllProducts, getProductById, getProductByCategories } = require("../controllers/ProductController");
const express = require('express');
// const protect=require("../middlewares/authMiddleware")
const router = express.Router();

router.post('/addProducts',protect,addProducts);
router.get('/getAllProducts',getAllProducts);
router.post('/getProductById/:id',getProductById);
router.delete('/deleteProduct/:id',protect,deleteProduct);
router.get('/getProductByCategories',getProductByCategories);
    
module.exports=router;