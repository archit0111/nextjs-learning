import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
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

const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema,"wishlist_items");
export default Wishlist;