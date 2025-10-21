import DatabaseFactory from "./factory.js"

class TicketsDAO {
    constructor() {
        this.db = DatabaseFactory.getDatabase("tickets")
    }

    async createOne(data) {
        return await this.db.createOne(data)
    }

    async findById(id) {
        return await this.db.findById(id)
    }

    async findAll() {
        return await this.db.findAll()
    }

    async findByComprador(email) {
        return await this.db.findByComprador(email)
    }
}

export default new TicketsDAO()
