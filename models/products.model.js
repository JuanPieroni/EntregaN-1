import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        /* trim: true */
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 10,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },

    category: {
        type: String,
        required: true,
    },
    
})

export const productsModel = mongoose.model("Product", productsSchema)
