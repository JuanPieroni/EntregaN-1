import BaseManager from "./base.manager.js"
import { userModel } from "../models/user.model.js"

class UserManager extends BaseManager {
    constructor() {
        super(userModel)
    }

    async findByEmail(email) {
        const user = await this.model.findOne({ email }).lean()
        if (!user) {
            return { success: false, message: "Usuario no encontrado" }
        }
        return { success: true, data: user }
    }
}

export const usersManager = new UserManager()