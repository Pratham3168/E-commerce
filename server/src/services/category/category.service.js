import slugify from "slugify";
import Category from "../../models/category.model.js";
import ApiError from "../../errors/apiError.js";
import { getCache, setCache, deleteCache } from "../../utils/cache.js";

const invalidateCategoryCache = async (slug) => {
  await deleteCache("categories:all");
  await deleteCache(`categories:${slug}`);
};

export const createCategory = async (categoryData) => {
  const { name, description } = categoryData;

  const slug = slugify(name, {
    lower: true,
    strict: true,
  });

  const existingCategory = await Category.findOne({ slug });

  if (existingCategory) {
    if (existingCategory.isActive) {
      throw new ApiError(409, "Category already exists");
    }

    throw new ApiError(
      409,
      "Category already exists but is inactive. Restore it instead.",
    );
  }

  const newCategory = new Category({
    name,
    description,
  });

  await newCategory.save();
  await deleteCache("categories:all");

  return newCategory;
};

export const getAllCategories = async () => {
  const cacheKey = "categories:all";
  const cachedData = await getCache(cacheKey);

  if (cachedData) {
    console.log("Cache Hit: ", cacheKey);
    return JSON.parse(cachedData);
  }

  console.log("Cache Miss: ", cacheKey);

  const categories = await Category.find({ isActive: true })
    .select("name description slug image")
    .sort({ name: 1 });

  await setCache(cacheKey, categories, 300);

  return categories;
};

export const getCategoryBySlug = async (slug) => {
  const cacheKey = `categories:${slug}`;
  const cachedData = await getCache(cacheKey);

  if (cachedData) {
    console.log("Cache Hit: ", cacheKey);
    return JSON.parse(cachedData);
  }

  console.log("Cache Miss: ", cacheKey);

  const category = await Category.findOne({ slug, isActive: true });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  await setCache(cacheKey, category, 300);

  return category;
};

export const updateCategory = async (categoryId, categoryData) => {
  const { name, description } = categoryData;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const oldSlug = category.slug;

  if (name === undefined && description === undefined) {
    throw new ApiError(400, "Please provide at least one field to update");
  }

  if (name !== undefined && name !== category.name) {
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
  if (description !== undefined && description !== category.description) {
    category.description = description;
  }

  await category.save();
  await invalidateCategoryCache(oldSlug);

  if (category.slug !== oldSlug) {
    await invalidateCategoryCache(category.slug);
  }

  return category;
};

export const deleteCategory = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (!category.isActive) {
    throw new ApiError(400, "Category is already inactive");
  }

  category.isActive = false;
  await category.save();
  await invalidateCategoryCache(category.slug);

  return category;
};


export const restoreCategory = async (categoryId) => {
    const category = await Category.findById(categoryId);

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    if (category.isActive) {
        throw new ApiError(400, "Category is already active");
    }

    category.isActive = true;

    await category.save();
    await invalidateCategoryCache(category.slug);

    return category;
};