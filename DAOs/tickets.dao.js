import { ticketModel } from "../models/ticket.model.js"

class TicketsDAO {
    async createOne(data) {
        const ticket = await ticketModel.create(data)
        return ticket.toObject()
    }

    async findById(id) {
        return await ticketModel
            .findById(id)
            .populate("products.product")
            .lean()
    }

    async findAll() {
        return await ticketModel.find().populate("products.product").lean()
    }

    async findByComprador(email) {
        return await ticketModel
            .find({ comprador: email })
            .populate("products.product")
            .lean()
    }
}

export default new TicketsDAO()
