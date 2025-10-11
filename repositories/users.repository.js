import UsersDAO from "../DAOs/users.dao.js"
import UserDTO from "../DTOs/users.dto.js"

class UsersRepository {
    async findAll() {
        const users = await UsersDAO.findAll()
        return users.map((user) => new UserDTO(user))
    }

    async findById(id) {
        const user = await UsersDAO.findById(id)
        if (!user) return { success: false, message: "Usuario no encontrado" }
        return { success: true, data: new UserDTO(user) }
    }

    async findByEmail(email) {
        const user = await UsersDAO.findByEmail(email)
        if (!user) return { success: false, message: "Usuario no encontrado" }
        return { success: true, data: new UserDTO(user) }
    }

    async createOne(data) {
        const user = await UsersDAO.createOne(data)
        return { success: true, data: new UserDTO(user) }
    }

    async updateOne(id, data) {
        const user = await UsersDAO.updateOne(id, data)
        if (!user) return { success: false, message: "Usuario no encontrado" }
        return { success: true, data: new UserDTO(user) }
    }

    async deleteOne(id) {
        const user = await UsersDAO.deleteOne(id)
        if (!user) return { success: false, message: "Usuario no encontrado" }
        return { success: true, data: new UserDTO(user) }
    }
    async findByEmailSinDTO(email) {
        const user = await UsersDAO.findByEmail(email)
        if (!user) return { success: false, message: "Usuario no encontrado" }
        return { success: true, data: user }
    }
}

export default new UsersRepository()
 