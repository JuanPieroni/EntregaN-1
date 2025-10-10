import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    },
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "ADMIN", "PUBLIC", "PREMIUM"],
    },
    fromGitHub: {
        type: Boolean,
        default: false,
    },
    //Todo
    /*     fromGoogle: {
        type: Boolean,
        default: false,
    }, */
})

export const userModel = mongoose.model("User", userSchema)
