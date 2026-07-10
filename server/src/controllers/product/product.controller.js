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

  const query = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    search: req.query.search || "",
    category: req.query.category || "",
    brand: req.query.brand || "",
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    sort: req.query.sort || "createdAt",
    order: req.query.order || "desc",
    featured: req.query.featured || false,
};

  const products = await productService.getAllProducts(query);

  return res.status(200).json(
    new ApiResponse(200, products, "Products fetched successfully")
  );
});


export const getAllProductsBySlugController = asyncHandler(async (req,res) => {
  const slug = req.params.slug;

  const product = await productService.getAllProductsBySlug(slug);

  return res.status(200).json(
    new ApiResponse(200, product, "Product fetched successfully")
  );
});

export const updateProductController = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;
  const updatedProduct = await productService.updateProduct(productId, updateData);

  return res.status(200).json(
    new ApiResponse(200, updatedProduct, "Product updated successfully")
  );
});