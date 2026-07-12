import slugify from "slugify";
import Product from "../../models/product.model.js";
import Category from "../../models/category.model.js";
import ApiError from "../../errors/apiError.js";
import fs from "fs/promises";
import { uploadToCloudinary , deleteFromCloudinary } from "../../utils/cloudinary.utils.js";

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
  const {
    page,
    limit,
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
    order,
    featured,
  } = query;
  const skip = (page - 1) * limit;
  const filter = { isActive: true };

  const allowedSortFields = {
    price: "price",
    name: "name",
    createdAt: "createdAt",
    averageRating: "averageRating",
    soldCount: "soldCount",
  };

  const sortField = allowedSortFields[sort] || "createdAt";
  const sortOrder = order === "asc" ? 1 : -1;
  const sortOption = {
    [sortField]: sortOrder,
  };

  if (category) {
    const categoryDoc = await Category.findOne({
      slug: category,
      isActive: true,
    });

    if (!categoryDoc) {
      throw new ApiError(404, "Category not found");
    }

    filter.category = categoryDoc._id;
  }

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: search,
          $options: "i",
        },
      },
    ];
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

  if (featured) {
    filter.isFeatured = featured === "true";
  }

  const products = await Product.find(filter)
    .populate("category", "name slug")
    .sort(sortOption)
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

export const getAllProductsBySlug = async (slug) => {
  const product = await Product.findOne({
    slug,
    isActive: true,
  })
    .populate("category", "name slug")
    .select("-__v");
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

export const updateProduct = async (productId, updateData) => {
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No fields provided for update");
  }
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (updateData.name && updateData.name !== product.name) {
    const slug = slugify(updateData.name, { lower: true, strict: true });

    const existingProduct = await Product.findOne({ slug });
    if (
      existingProduct &&
      existingProduct._id.toString() !== productId.toString()
    ) {
      throw new ApiError(
        409,
        "Product with this name already exists, choose a different name",
      );
    }

    product.name = updateData.name;
  }

  if (
    updateData.category &&
    updateData.category !== product.category.toString()
  ) {
    const categoryDoc = await Category.findById(updateData.category);

    if (!categoryDoc) {
      throw new ApiError(404, "Category not found");
    }

    if (!categoryDoc.isActive) {
      throw new ApiError(400, "Cannot assign product to an inactive category");
    }

    product.category = updateData.category;
  }

  if (updateData.description !== undefined) {
    product.description = updateData.description;
  }
  if (updateData.brand !== undefined) {
    product.brand = updateData.brand;
  }
  if (updateData.price !== undefined) {
    product.price = updateData.price;
  }
  if (updateData.discountPercentage !== undefined) {
    product.discountPercentage = updateData.discountPercentage;
  }
  if (updateData.stock !== undefined) {
    product.stock = updateData.stock;
  }
  if (updateData.isFeatured !== undefined) {
    product.isFeatured = updateData.isFeatured;
  }

  await product.save();
  await product.populate("category", "name slug");
  return product;
};

export const deleteProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!product.isActive) {
    throw new ApiError(400, "Product is already inactive");
  }

  product.isActive = false;

  await product.save();

  return product;
};

export const restoreProduct = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  if (product.isActive) {
    throw new ApiError(400, "Product is already active");
  }

  product.isActive = true;

  await product.save();

  return product;
};




export const uploadProductImages = async (productId, files) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!files || files.length === 0) {
    throw new ApiError(400, "Please upload at least one image");
  }


  const uploadedImages = await Promise.all(
    files.map(async (file, index) => {
      console.log(`Image ${index + 1}: Upload started`);
      console.log(file.path);

      const image = await uploadToCloudinary(file.path);

      console.log(`Image ${index + 1}: Upload finished`);

      await fs.unlink(file.path);

      console.log(`Image ${index + 1}: File deleted`);

      return image;
    })
  );


  product.images.push(...uploadedImages);

  await product.save();

  console.log("Product saved");

  await product.populate("category", "name slug");

  console.log("Populate done");

  return product;
};



export const deleteProductImage = async (productId, imageId) => {
  const product = await Product.findById(productId);

  if(!product || !product.isActive){
    throw new ApiError(404, "Product not found or inactive");
  }

  const image = product.images.find((img) => img._id.toString() === imageId);

  if(!image){
    throw new ApiError(404, "Image not found");
  }

  const publicId = image.public_id;
  await deleteFromCloudinary(publicId);

  
  product.images = product.images.filter((img) => img._id.toString() !== imageId);

  await product.save();

  await product.populate("category", "name slug");

  return product;
}