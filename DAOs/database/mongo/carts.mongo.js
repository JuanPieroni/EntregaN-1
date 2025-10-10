import { cartsModel } from "../../../models/cart.model.js"

export default class MongoCartsDatabase {
    findAll = async () => {
        return await cartsModel.find().populate("products.product").lean()
    }

    findById = async (id) => {
        return await cartsModel.findById(id).populate("products.product").lean()
    }

    createOne = async (data) => {
        return await cartsModel.create(data)
    }

    updateOne = async (id, data) => {
        return await cartsModel.findByIdAndUpdate(id, data, { new: true })
    }

    deleteOne = async (id) => {
        return await cartsModel.findByIdAndDelete(id)
    }

    aggregate = async (detalle) => {
        return await cartsModel.aggregate(detalle)
    }
}
