import slugify from "slugify";
import Product from "../../models/product.model.js";
import Category from "../../models/category.model.js";
import ApiError from "../../errors/apiError.js";

export const createProduct = async (productData) => {
  const {
    name,
    description,
    category,
    brand,
    price,
    discountPercentage,
    stock,
    isFeatured,
  } = productData;
  const categoryDoc = await Category.findById(category);

  if (!categoryDoc) {
    throw new ApiError(404, "Category not found");
  }

  if (!categoryDoc.isActive) {
    throw new ApiError(400, "Cannot create product in an inactive category");
  }

  const slug = slugify(name, { lower: true, strict: true });

  const existingProduct = await Product.findOne({ slug });

  if (existingProduct) {
    throw new ApiError(409, "Product with this name already exists");
  }

  const sku = `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const product = new Product({
    name,
    description,
    category,
    brand,
    price,
    discountPercentage,
    stock,
    isFeatured,
    sku,
  });

  await product.save();

  return product;
};


export const getAllProducts = async(query) => {

  const { page , limit, search} = query;
  const skip = (page-1)*limit;
  const filter = { isActive: true};

  if(search){
    filter.name = {
      $regex: search,
      $options: "i"
    }
  }

  const products = await Product.find(filter)
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limit);
  const hasNextPage = page * limit < totalProducts;
  const hasPrevPage = page > 1;

  return {
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages,
      hasNextPage,
      hasPrevPage
    }
  };
};