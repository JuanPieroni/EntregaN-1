import { productsModel } from "../../../models/product.model.js"

export default class MongoProductsDatabase {
    findAll = async (query, options) => {
        return await productsModel.paginate(query, options)
    }

    findById = async (id) => {
        return await productsModel.findById(id)
    }

    createOne = async (data) => {
        return await productsModel.create(data)
    }

    updateOne = async (id, data) => {
        return await productsModel.findByIdAndUpdate(id, data, { new: true })
    }

    deleteOne = async (id) => {
        return await productsModel.findByIdAndDelete(id)
    }
}
