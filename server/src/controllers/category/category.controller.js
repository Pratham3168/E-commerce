import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import * as categoryService from "../../services/category/category.service.js";

export const createCategoryController = asyncHandler(async (req,res) => {

    const category = await categoryService.createCategory(req.body);
    
    return res.status(201).json(
        new ApiResponse(
            201,
            category,
            "Category created successfully"
        )
    );
});

export const getAllCategoriesController = asyncHandler(async (req,res) => {
    const categories = await categoryService.getAllCategories();

    return res.status(200).json(
        new ApiResponse(
            200,
            categories,
            "Categories fetched successfully"
        )
    )

});
