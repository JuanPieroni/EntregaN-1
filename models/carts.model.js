// Schema for shopping cart
const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.type.ObjectId,
                ref: "Products",
            },

            quantity: {
                type: Number,
            },
        },
    ],
})

export const cartsModel = mongoose.model("Carts", cartsSchema)
