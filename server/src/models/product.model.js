import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    slug:{
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    discountPercentage:{
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    stock:{
        type: Number,
        default: 0,
        min: 0
    },
    images: [
    {
        public_id: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    }
],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default: true
    },
    averageRating:{
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalReviews:{
        type: Number,
        default: 0,
        min: 0
    },
    soldCount:{
        type: Number,
        default: 0,
        min: 0
    },
    sku: {
    type: String,
    unique: true,
    required: true
}
}, {timestamps: true});


productSchema.pre("save", function () {
    if (!this.isModified("name")) return;

    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });
});


const Product = mongoose.model("Product", productSchema);

export default Product;