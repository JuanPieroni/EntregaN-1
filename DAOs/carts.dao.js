import DatabaseFactory from "./factory.js"

class CartsDAO {
    constructor() {
        this.db = DatabaseFactory.getDatabase('carts')
    }

    findAll = async () => {
        return await this.db.findAll()
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

    aggregate = async (detalle) => {
        return await this.db.aggregate(detalle)
    }
}

export default new CartsDAO()
