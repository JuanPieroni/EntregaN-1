

export default class BaseManager {
    constructor(model) {
        this.model = model
    }

    async findAll() {
        const findAll = await this.model.find().lean()
        return findAll
    }

    async findById(id) {
        const idFound = await this.model.findById(id)
        if (!idFound) {
            return { success: false, message: "Articulo no encontrado" }
        }
        return { success: true, data: idFound }
    }

    async createOne(obj) {
        console.log("obj", obj)
        const created = await this.model.create(obj)
        return created
    }

    async updateOne(id, obj) {
        const updated = await this.model.findByIdAndUpdate(id, obj, {
            new: true,
        })
        if (!updated) {
            return { success: false, message: "Articulo no encontrado" }
        }
        return { success: true, data: updated }
    }

    async deleteOne(id) {
        const deleted = await this.model.findByIdAndDelete(id)
        if (!deleted) {
            return { success: false, message: "Articulo no encontrado" }
        }
        return { success: true, data: deleted }
    }
}
