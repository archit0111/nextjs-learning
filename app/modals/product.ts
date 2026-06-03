import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    categories:Array,
    image:String,
    wishlist:{
        type:Boolean,
        default:false
    },
    cart:{
        type:Boolean,
        default:false
    }
});

const Product = mongoose.models.Product || mongoose.model("Product",productSchema,"products");

export default Product;