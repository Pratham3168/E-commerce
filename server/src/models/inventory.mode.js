import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        type: {
            type: String,
            enum: ['IN', 'OUT','ADJUSTMENT'],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
        },

        previousStock: {
            type: Number,
            required: true,
            min: [0, 'Previous stock cannot be negative'],
        },

        newStock: {
            type: Number,
            required: true,
            min: [0, 'New stock cannot be negative'],
        },

        reason: {
            type: String,
            trim: true,
            default: "",
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

inventorySchema.index({product: 1, createdAt: -1});

inventorySchema.index({updatedBy: 1});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;