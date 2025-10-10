import DatabaseFactory from "./factory.js"

class UsersDAO {
    constructor() {
        this.db = DatabaseFactory.getDatabase('users')
    }

    findAll = async () => {
        return await this.db.findAll()
    }

    findById = async (id) => {
        return await this.db.findById(id)
    }

    findByEmail = async (email) => {
        return await this.db.findByEmail(email)
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

export default new UsersDAO()
