export default class BaseManager {
    constructor(dao) {
        this.dao = dao
    }

    async findAll() {
        return await this.dao.findAll()
    }

    async findById(id) {
        const idFound = await this.dao.findById(id)
        if (!idFound) {
            return {
                success: false,
                message: "Articulo no encontrado",
            }
        }
        return { success: true, data: idFound }
    }

    async createOne(obj) {
        /*  console.log("obj", obj) */
        const created = await this.dao.createOne(obj)
        return {
            success: true,
            data: created,
        }
    }

    async updateOne(id, obj) {
        const updated = await this.dao.updateOne(id, obj)
        if (!updated) {
            return { success: false, message: "Articulo no encontrado" }
        }
        return { success: true, data: updated }
    }

    async deleteOne(id) {
        const deleted = await this.dao.deleteOne(id)
        if (!deleted) {
            return { success: false, message: "Articulo no encontrado" }
        }
        return { success: true, data: deleted }
    }
}
