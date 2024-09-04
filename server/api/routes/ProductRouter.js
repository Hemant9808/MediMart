const { addProducts, getAllProducts, getProductById, getProductByCategories } = require("../controllers/ProductController");
const express = require('express');

const router = express.Router();

router.post('/',addProducts);
router.get('/getAllProducts',getAllProducts);
router.post('/getProductById/:id',getProductById);
router.delete('/deleteProduct/:id',deleteProduct);
router.get('/getProductByCategories',getProductByCategories);
    
module.exports=router;