import slugify from "slugify";
import Category from "../../models/category.model.js";
import ApiError from "../../errors/apiError.js";

export const createCategory = async (categoryData) => {

    const {name,description} = categoryData;

    const slug = slugify(name, {
        lower: true,
        strict: true,
    })

    const ifCategoryExists = await Category.findOne({slug});

    if(ifCategoryExists){
        throw new ApiError(409, "Category already exists");
    }

    const newCategory = new Category({
        name,
        description
    });

    await newCategory.save();

    return newCategory;
};


export const getAllCategories = async () => {
    const categories = await Category.find({isActive: true})
                                    .select("name description slug image")
                                    .sort({name: 1})

    return categories;
}


export const getCategoryBySlug = async (slug) => {
    const category = await Category.findOne({slug, isActive: true});

    if(!category){
        throw new ApiError(404, "Category not found");
    }

    return category;
};



export const updateCategory = async (categoryId, categoryData) => {
    const {name , description} = categoryData;

    const category = await Category.findById(categoryId);

    if(!category){
        throw new ApiError(404, "Category not found");
    }

    if (name === undefined && description === undefined) {
        throw new ApiError(
            400,
            "Please provide at least one field to update"
        );
    }

    if(name !== undefined && name !== category.name){
        const slug = slugify(name, {
            lower: true,
            strict: true,
        });

        const existingCategory = await Category.findOne({ slug });

        if (
            existingCategory &&
            existingCategory._id.toString() !== category._id.toString()
        ) {
            throw new ApiError(409, "Category already exists");
        }

        category.name = name;
    }
    if(description !== undefined && description !== category.description){
        category.description = description;
    }

    await category.save();

    return category;
}