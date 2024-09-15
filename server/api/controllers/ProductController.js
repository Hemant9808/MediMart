const Product = require("../models/ProductModel");
const Category = require('../models/CategoryModel');
const checkFields = require("../utils/validator");

getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};


getProductById = async (req, res) => {
    try {
        console.log('getProductById');
        
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send(product);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid product ID' });
        }
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};


deleteProduct = async (req, res) => {
    try {
        if(req.user.role!=='admin'){
            return res.status(501).json({message:"only admin is authorize to delete products"})
        }
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).send({ message: 'Invalid product ID' });
        }
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

getProductByCategories = async (req, res) => {
    try {
        const { category } = req.query;
        console.log(category);
        const categoryId = await Category.findOne({name:category}).select('_id');
        if (!categoryId) {
            return res.status(200).json({ message: 'This category doesnt exists.' });
        }

        // Ensure categories is an array
       // const categoryArray = Array.isArray(categories) ? categories : [categories];

        // Fetch products that belong to any of the specified categories
        const products = await Product.find({ categories: { $in: categoryId } });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in the given categories.' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by categories:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};



addProducts = async (req, res) => {
    try {
     // Check if the user is an admin
     console.log("req.user.role",req.user.role);
     
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Only admin is authorized to add products" });
      }
  
      const {
        name,
        description,
        price,
        categories,  
        brand,
        manufacturer,
        stock,
        images,
        discountPrice,  
      } = req.body;
  
     
      if (!name || !description || !price || !categories || !brand || !manufacturer || !stock || !images) {
        return res.status(400).send({ message: "Please fill in all required fields" });
      }
  
   
  
     const categoryIds =[];
      for(const categoryName of categories){
        let category = await Category.findOne({name:categoryName})
        if(!category){
             console.log("category inside condition", category);
             
             category = new Category ({
                name : categoryName
            })
        category.save();
        console.log("added category",category);
        
        }
        categoryIds.push(category._id);

      }

  

      const newProduct = new Product({
        name,
        description,
        price,
        categories: categoryIds.map(cat => cat._id), 
        manufacturer,
        stock,
        images,
        discountPrice, 
      });
  
   
      await newProduct.save();
  
      res.status(201).json(newProduct);
  
    } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
    }
  };


 


module.exports = { addProducts,getProductById,deleteProduct,getAllProducts,getProductByCategories };
