import { ticketModel } from "../../../models/ticket.model.js"

export default class MongoTicketsDatabase {
    createOne = async (data) => {
        const ticket = await ticketModel.create(data)
        return ticket.toObject()
    }

    findById = async (id) => {
        return await ticketModel
            .findById(id)
            .populate("products.product")
            .lean()

    }

    findAll = async () => {
        return await ticketModel.find().populate("products.product").lean()
    }

    findByComprador = async (email) => {
        return await ticketModel
            .find({ comprador: email })
            .populate("products.product")
            .lean()
    }
}
