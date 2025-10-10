import { userModel } from "../models/user.model.js"

class UsersDAO {
    static findAll = async () => {
        return await userModel.find().lean()
    }
    static findById = async (id) => {
        return await userModel.findById(id).lean()
    }
    static findByEmail = async (email) => {
        return await userModel
            .findOne({ email })
            .populate({ path: "cart", populate: { path: "products.product" } })
            .lean()
    }
    static createOne = async (data) => {
        return await userModel.create(data)
    }

    static updateOne = async (id, data) => {
        return await userModel.findByIdAndUpdate(id, data, { new: true })
    }

    static deleteOne = async (id) => {
        return await userModel.findByIdAndDelete(id)
    }
}

export default UsersDAO
