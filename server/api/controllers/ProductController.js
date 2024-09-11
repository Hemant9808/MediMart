const Product = require("../models/ProductModel");
const checkFields = require("../utils/validator");
// const validator = require("../utils/validator");
addProducts = async (req, res) => {
    // console.log(req.body);
  try {
    if(req.user.role!=='admin'){
        return res.status(501).json({message:"only admin is authorize to add products"})
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
    } = req.body;
    if (
        !name ||
        !description ||
        !price ||
        !categories ||
        !brand ||
        !manufacturer ||
        !stock ||
        !images
    ) {
        return res.status(400).send({ message: "Enter all the fields" });
    }
    

    const newProduct = new Product({
        name,
        description,
        price,
        categories,
        brand,
        manufacturer,
        stock,
        images,
    });
    newProduct.save();

    res.send(newProduct);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
   
};

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
        const { categories } = req.query;

        if (!categories) {
            return res.status(400).json({ message: 'Please provide at least one category.' });
        }

        // Ensure categories is an array
        const categoryArray = Array.isArray(categories) ? categories : [categories];

        // Fetch products that belong to any of the specified categories
        const products = await Product.find({ categories: { $in: categoryArray } });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in the given categories.' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by categories:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};





module.exports = { addProducts,getProductById,deleteProduct,getAllProducts,getProductByCategories };
