import DatabaseFactory from "./factory.js"

class ProductsDAO {
    constructor() {
        this.db = DatabaseFactory.getDatabase('products')
    }

    findAll = async (query, options) => {
        return await this.db.findAll(query, options)
    }

    findById = async (id) => {
        return await this.db.findById(id)
    }

    createOne = async (data) => {
        return await this.db.createOne(data)
    }

    updateOne = async (id, data) => {
        return await this.db.updateOne(id, data)
    }

    deleteOne = async (id) => {
        return await this.db.deleteOne(id)
    }
}

export default new ProductsDAO()