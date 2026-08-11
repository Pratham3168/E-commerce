import Product from "../../models/product.model.js";
import Inventory from "../../models/inventory.mode.js";
import ApiError from "../../errors/apiError.js";

export const addStock = async (productId, quantity, reason, adminId) => {

    const product = await Product.findById(productId);

    if(!product || !product.isActive){
        throw new ApiError(404, "Product not found or inactive")
    }

    const previousStock = product.stock;
    const newStock = previousStock + quantity;

    product.stock = newStock;
    await product.save();

    const inventory = await Inventory.create({
        product: productId,
        type: 'IN',
        quantity,
        previousStock,
        newStock,
        reason,
        updatedBy: adminId,
    });

    return inventory;

}



export const reduceStock = async (productId, quantity, reason, adminId) => {

    const product = await Product.findById(productId);

    if(!product || !product.isActive){
        throw new ApiError(404, "Product not found or inactive")
    }

    if(product.stock < quantity){
        throw new ApiError(400, "Insufficient stock to reduce")
    }

    const previousStock = product.stock;
    const newStock = previousStock - quantity;

    product.stock = newStock;

    await product.save();

    const inventory = await Inventory.create({
        product: productId,
        type: 'OUT',
        quantity,
        previousStock,
        newStock,
        reason,
        updatedBy: adminId,
    });

    return inventory;

};


export const adjustStock = async (productId, newStock, reason, adminId) => {

    const product = await Product.findById(productId);

    if(!product || !product.isActive){
        throw new ApiError(404, "Product not found or inactive")
    }

    const previousStock = product.stock;
    if(newStock < 0){
        throw new ApiError(400, "New stock cannot be negative")
    }

    if(previousStock === newStock){
        throw new ApiError(400, "Stock is already at this value")
    }

    product.stock = newStock;
    await product.save();

    const inventory = await Inventory.create({
        product: productId,
        type: 'ADJUSTMENT',
        quantity: Math.abs(newStock - previousStock),
        previousStock,
        newStock,
        reason,
        updatedBy: adminId,
    })

    return inventory;

};



export const getInventoryHistory = async (productId, query) => {
    const {
        page,
        limit,
        type,
        sort,
        order,
    } = query;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const product = await Product.exists({
        _id: productId,
        isActive: true,
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const filter = {
        product: productId,
    };

    if (type && ["IN", "OUT", "ADJUSTMENT"].includes(type)) {
        filter.type = type;
    }

    const sortOrder = order?.toLowerCase() === "asc" ? 1 : -1;

    const allowedSortFields = {
        createdAt: "createdAt",
        quantity: "quantity",
        type: "type",
    };

    const sortField = allowedSortFields[sort] || "createdAt";

    const [inventory, totalRecords] = await Promise.all([
        Inventory.find(filter)
            .populate("updatedBy", "firstName lastName email")
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limitNumber),

        Inventory.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalRecords / limitNumber);

    return {
        inventory,
        pagination: {
            page: pageNumber,
            limit: limitNumber,
            totalRecords,
            totalPages,
            hasNextPage: pageNumber < totalPages,
            hasPrevPage: pageNumber > 1,
        },
    };
};