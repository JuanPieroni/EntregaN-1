import TicketsDAO from "../DAOs/tickets.dao.js"

class TicketsRepository {
    async createOne(data) {
        const ticket = await TicketsDAO.createOne(data)
        return {
            success: true,
            data: ticket,
        }
    }

    async findById(id) {
        const ticket = await TicketsDAO.findById(id)
        if (!ticket) {
            return {
                success: false,
                message: "Ticket no encontrado",
            }
        }
        return { success: true, data: ticket }
    }

    async findAll() {
        const tickets = await TicketsDAO.findAll()
        return {
            success: true,
            data: tickets,
        }
    }

    async findByComprador(email) {
        const ticket = await TicketsDAO.findByComprador(email)
        if (!ticket) {
            return {
                success: false,
                message: "Ticket no encontrado",
            }
        }
        return { success: true, data: ticket }
    }
}

export default new TicketsRepository()
