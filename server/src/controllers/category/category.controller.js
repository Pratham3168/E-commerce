import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import { createCategory } from "../../services/category/category.service.js";

export const createCategoryController = asyncHandler(async (req,res) => {

    const category = await createCategory(req.body);
    
    return res.status(201).json(
        new ApiResponse(
            201,
            category,
            "Category created successfully"
        )
    );
});


