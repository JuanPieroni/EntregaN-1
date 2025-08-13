import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
    disponible: {
        type: Boolean,
        default: true,
    },
})
productsSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model("Product", productsSchema)
