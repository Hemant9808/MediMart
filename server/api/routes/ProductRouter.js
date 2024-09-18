const { protect } = require("../middlewares/authMiddleware");

const { addProducts, getAllProducts, getProductById, getProductByCategories } = require("../controllers/ProductController");
const express = require('express');
const { getAllCategories } = require("../controllers/CategoryController");
// const protect=require("../middlewares/authMiddleware")
const router = express.Router();

router.post('/addProducts',protect,addProducts);
router.get('/getAllProducts',getAllProducts);
router.post('/getProductById/:id',getProductById);
router.delete('/deleteProduct/:id',protect,deleteProduct);
router.get('/getProductByCategories',getProductByCategories);
router.get('/getAllCategories',getAllCategories);
    
module.exports=router;