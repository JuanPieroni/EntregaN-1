import { userModel } from "../../../models/user.model.js"

export default class MongoUsersDatabase {
    findAll = async () => {
        return await userModel.find().lean()
    }

    findById = async (id) => {
        return await userModel.findById(id).lean()
    }

    findByEmail = async (email) => {
        return await userModel
            .findOne({ email })
            .populate({ path: "cart", populate: { path: "products.product" } })
            .lean()
    }

    createOne = async (data) => {
        return await userModel.create(data)
    }

    updateOne = async (id, data) => {
        return await userModel.findByIdAndUpdate(id, data, { new: true })
    }

    deleteOne = async (id) => {
        return await userModel.findByIdAndDelete(id)
    }
}
