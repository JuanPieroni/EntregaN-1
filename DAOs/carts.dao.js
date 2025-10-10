import { cartsModel } from "../models/cart.model.js"

class CartsDAO {
    static findAll = async () => {
        return await cartsModel.find().populate("products.product").lean()
    }

    static findById = async (id) => {
        return await cartsModel.findById(id).populate("products.product").lean()
    }

    static createOne = async (data) => {
        return await cartsModel.create(data)
    }

    static updateOne = async (id, data) => {
        return await cartsModel.findByIdAndUpdate(id, data, { new: true })
    }

    static deleteOne = async (id) => {
        return await cartsModel.findByIdAndDelete(id)
    }

    static aggregate = async (detalle) => {
        return await cartsModel.aggregate(detalle)
    }
}

export default CartsDAO
