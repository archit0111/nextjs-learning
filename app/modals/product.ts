import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    categories:Array,
    image:String
});

const Product = mongoose.models.Product || mongoose.model("Product",productSchema,"products");

export default Product;