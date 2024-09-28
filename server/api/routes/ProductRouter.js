const { protect } = require("../middlewares/authMiddleware");

const { addProducts, getAllProducts, getProductById, getProductByCategories, getProductBySubcategories } = require("../controllers/ProductController");
const express = require('express');
const { getAllCategories, addOrUpdateCategory } = require("../controllers/CategoryController");
// const protect=require("../middlewares/authMiddleware")
const router = express.Router();

router.post('/addProducts',protect,addProducts);
router.get('/getAllProducts',getAllProducts);
router.post('/getProductById/:id',getProductById);
router.delete('/deleteProduct/:id',protect,deleteProduct);
router.get('/getProductByCategories',getProductByCategories);
router.get('/getAllCategories',getAllCategories);
router.post('/addOrUpdateCategory',addOrUpdateCategory);
router.post('/getProductBySubcategories',getProductBySubcategories);

    
module.exports=router;