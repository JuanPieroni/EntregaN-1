import BaseManager from "./base.manager.js"
import UsersDAO from "../DAOs/users.dao.js"

class UserManager extends BaseManager {
    constructor() {
       
        super(UsersDAO)
    }

    async findByEmail(email) {
       
        const user = await UsersDAO.findByEmail(email)
        if (!user) {
            return { success: false, message: "Usuario no encontrado" }
        }
        return { success: true, data: user }
    }
}

export const usersManager = new UserManager()
