import * as inventoryService from "../../services/inventory/inventory.service.js";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const addStockController = asyncHandler(async (req,res) => {

    const {quantity,reason} = req.body;
    const inventory = await inventoryService.addStock(
        req.params.productId,
        quantity,
        reason,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            inventory,
            "Stock added successfully"
        )
    );

});


export const reduceStockController = asyncHandler(async (req,res) => {

    const { quantity, reason} = req.body;

    const inventory = await inventoryService.reduceStock(
        req.params.productId,
        quantity,
        reason, 
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            inventory,
            "Stock reduced successfully"
        )
    );

});


export const adjustStockController = asyncHandler(async (req, res) => {
    const { newStock, reason } = req.body;

    const inventory = await inventoryService.adjustStock(
        req.params.productId,
        newStock,
        reason,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            inventory,
            "Stock adjusted successfully"
        )
    );
});





export const getInventoryHistoryController = asyncHandler(
    async (req, res) => {

        const result = await inventoryService.getInventoryHistory(
            req.params.productId,
            req.query
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Inventory history fetched successfully"
            )
        );
    }
);