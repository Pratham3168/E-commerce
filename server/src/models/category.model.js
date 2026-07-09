import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description:{
        type: String,
        trim: true,
        default: ""
    },
    slug:{
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    image:{
        public_id: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    isActive:{
        type: Boolean,
        default: true
    },
}, {timestamps: true});


categorySchema.pre("save", function() {

    if(!this.isModified("name")) return;

    this.slug = slugify(this.name, {
        lower: true,
        strict:true
    });

});


const Category = mongoose.model("Category", categorySchema);

export default Category;