import BaseManager from "./base.manager.js"
import { userModel } from "../models/user.model.js"

class UserManager extends BaseManager {
    constructor() {
        //Todo : Esta Bien el "Cart" aca para hacer el populate?
        super(userModel /* , "Cart" */)
    }

    async findByEmail(email) {
        //Todo: Usermodel.findone o this.model.findOne?
        //ToDo: aca hacer populate? esta correcto ? 
        const user = await this.model
            .findOne({
                email,
            }) /* .populate({path: "cart", populate:{path: "products.product"}}) */
            .lean()
        if (!user) {
            return { success: false, message: "Usuario no encontrado" }
        }
        return { success: true, data: user }
    }
}

export const usersManager = new UserManager()
