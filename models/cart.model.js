
import mongoose from "mongoose"

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
              
            },
        },
    ],
})

export const cartModel = mongoose.model("Cart", cartsSchema)
