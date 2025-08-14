import { create } from "express-handlebars"
import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },

            cantidad: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const cartsModel = mongoose.model("Cart", cartSchema)
