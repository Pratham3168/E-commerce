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