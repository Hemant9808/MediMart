const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const checkFields = require("../utils/validator");
const Subcategory = require("../models/SubcategoryModel");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

getProductById = async (req, res) => {
  try {
    console.log("getProductById");

    // const product = await Product.findById(req.params.id);
    const product = await Product.findById(req.params.id)
      .populate("categories", "name")
      .populate("subcategories", "name");
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const productWithCategoryNames = {
      ...product.toObject(),
      categories: product.categories.map((category) => category.name),
      subcategories: product.subcategories.map(
        (subcategory) => subcategory.name
      ),
    };

    res.status(200).send(productWithCategoryNames);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).send({ message: "Invalid product ID" });
    }
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

deleteProduct = async (req, res) => {
  try {
    // if(req.user.role!=='admin'){
    //     return res.status(501).json({message:"only admin is authorize to delete products"})
    // }
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).send({ message: "Invalid product ID" });
    }
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const getProductByCategories = async (req, res) => {
  try {
    const { category } = req.query;
    console.log(category);
    const categoryId = await Category.findOne({ name: category }).select("_id");
    if (!categoryId) {
      return res.status(200).json({ message: "This category doesnt exists." });
    }

    // const categoryArray = Array.isArray(categories) ? categories : [categories];

    const products = await Product.find({ categories: { $in: categoryId } });

    if (products.length === 0) {
      return res.status(404).json(products);
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by categories:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getProductBySubcategories = async (req, res) => {
  try {
    const { subcategoryIds } = req.body;
    const products = await Product.find({
      subcategories: { $in: subcategoryIds },
    });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the selected subcategories" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addProducts = async (req, res) => {
  try {
    console.log("req.user.role", req.user.role);
    console.log("req.body", req.body);

    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ message: "Only admin is authorized to add products" });
    // }

    const {
      _id,
      name,
      description,
      price,
      category,
      subcategories,
      brand,
      manufacturer,
      stock,
      images,
      discountPrice,
    } = req.body;

    // if (!name || !description || !price || !categories || !brand || !manufacturer || !stock || !images) {
    //   return res.status(400).send({ message: "Please fill in all required fields" });
    // }

    const categoryIds = [];

    let findCategory = await Category.findOne({ name: category[0] });
    console.log("findCategory", findCategory);

    categoryIds.push(findCategory._id);
    console.log("categoryIds", categoryIds);

    let subcategoryIds = [];
    if (subcategories && subcategories.length > 0) {
      for (const subcategoryName of subcategories) {
        console.log("Processing subcategory:", subcategoryName);

        let subcategory = await Subcategory.findOne({ name: subcategoryName });
        if (!subcategory) {
          console.log(
            "Subcategory not found, creating a new subcategory:",
            subcategoryName
          );

          subcategory = new Subcategory({
            name: subcategoryName,
            parentCategory: categoryIds[0],
          });
          await subcategory.save();
          console.log("Added new subcategory:", subcategory);
        }
        subcategoryIds.push(subcategory._id);
      }
    }

    console.log("Category IDs:", categoryIds);
    console.log("Subcategory IDs:", subcategoryIds);

    let product;
    if (_id) {
      console.log("product update sucessfully");
      product = await Product.findByIdAndUpdate(
        _id,
        {
          name,
          description,
          price,
          categories: categoryIds,
          subcategories: subcategoryIds,
          manufacturer,
          stock,
          brand,
          images,
          discountPrice,
        },
        { new: true }
      );
      res.send({
        success: 200,
        message: "product updated successfully",
        product,
      });
    } else {
      console.log("product created sucessfully");

      product = new Product({
        name,
        description,
        price,
        categories: categoryIds,
        subcategories: subcategoryIds,
        manufacturer,
        stock,
        brand,
        images,
        discountPrice,
      });
      await product.save();
      res.send({
        success: 200,
        message: "product added successfully",
        product,
      });
    }

    // const newProduct = new Product({
    //   name,
    //   description,
    //   price,
    //   categories: categoryIds,
    //   subcategories: subcategoryIds,
    //   manufacturer,
    //   stock,
    //   brand,
    //   images,
    //   discountPrice,
    // });

    // console.log("New Product:", newProduct);

    // await newProduct.save();

    // res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const uploadImage = async (req, res) => {
  const coverImageLocalPath = req.file?.path;
  console.log("coverImageLocalPath", coverImageLocalPath);

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  console.log("coverImage", coverImage);

  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");

  return res.status(200).json(coverImage.url);
};

module.exports = {
  addProducts,
  getProductById,
  deleteProduct,
  getAllProducts,
  getProductByCategories,
  getProductBySubcategories,
  uploadImage,
};
