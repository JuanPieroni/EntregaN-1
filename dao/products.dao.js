import { productsModel } from "../models/product.model.js"

class ProductsDAO {
    static findAll = async (query, options) => {
        return await productsModel.paginate(query, options)
    }

    static findById = async (id) => {
        return await productsModel.findById(id)
    }

    static createOne = async (data) => {
        return await productsModel.create(data)
    }

    static updateOne = async (id, data) => {
        return await productsModel.findByIdAndUpdate(id, data, { new: true })
    }
    static deleteOne = async (id) => {
        return await productsModel.findByIdAndDelete(id)
    }
}

export default ProductsDAO