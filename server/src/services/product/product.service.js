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

export const getAllProducts = async (query) => {
  const { page, limit, search, category, brand, minPrice, maxPrice } = query;
  const skip = (page - 1) * limit;
  const filter = { isActive: true };

  let categoryDoc;
  if (category) {
    categoryDoc = await Category.findOne({
      slug: category,
      isActive: true,
    });

    if (!categoryDoc) {
      throw new ApiError(404, "Category not found");
    }

    filter.category = categoryDoc._id;
  }

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (brand) {
    filter.brand = {
      $regex: `^${brand}$`,
      $options: "i",
    };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
  }

  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    throw new ApiError(
      400,
      "Minimum price cannot be greater than maximum price",
    );
  }

  if (minPrice) {
    filter.price.$gte = Number(minPrice);
  }
  if (maxPrice) {
    filter.price.$lte = Number(maxPrice);
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
      hasPrevPage,
    },
  };
};
