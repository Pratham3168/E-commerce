import asyncHandler from "../../utils/asyncHandler.js";
import * as productService from "../../services/product/product.service.js";
import ApiResponse from "../../utils/apiResponse.js";

export const createProductController = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  return res
    .status(201)
    .json(new ApiResponse(
    201,
    product,
    "Product created successfully"
));
});


export const getAllProductsController = asyncHandler(async (req,res) => {
  const products = await productService.getAllProducts();

  return res.status(200).json(
    new ApiResponse(200, products, "Products fetched successfully")
  );
});
