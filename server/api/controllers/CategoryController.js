const Category = require("../models/CategoryModel");

const getAllCategories = async(req,res)=>{

    try {
    const categories = await Category.find().select("name");
    res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }


}
module.exports = { getAllCategories };
