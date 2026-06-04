import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [{productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", 
                required: true
            }}]
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema,"cart_items");
export default Cart;