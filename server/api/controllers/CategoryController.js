const Category = require("../models/CategoryModel");

const getAllCategories = async(req,res)=>{

    try {
    const categories = await Category.find().select("name");
    res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
}

const addOrUpdateCategory = async (req, res) => {
    try {
        const { id, name } = req.body;

        if (id) {
            const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
            if (!category) {
                return res.status(404).send({ message: "Category doesn't exist." });
            }

            return res.status(200).send({ message: "Category updated successfully.", category });
        } else {
            const newCategory = new Category({ name });
            await newCategory.save();

            return res.status(201).send({ message: "Category added successfully.", newCategory });
        }
    } catch (error) {
        console.error("Error in addOrUpdateCategory:", error);
        return res.status(500).send({ message: "Internal server error.", error });
    }
};




module.exports = { getAllCategories,addOrUpdateCategory };
