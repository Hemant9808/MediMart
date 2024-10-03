const { protect } = require("../middlewares/authMiddleware");

const { addProducts, getAllProducts, getProductById, getProductByCategories, getProductBySubcategories, uploadImage } = require("../controllers/ProductController");
const express = require('express');
const { getAllCategories, addOrUpdateCategory } = require("../controllers/CategoryController");
const { upload } = require("../middlewares/multer.middileware");
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
router.post("/upload-image" ,upload.single("file"), uploadImage)

    
module.exports=router;