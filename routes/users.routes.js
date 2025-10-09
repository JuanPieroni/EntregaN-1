import CustomRouter from "../utils/CustomRouter.js"
import { handlePolicies } from "../middlewares/handlePolicies.js"
import {
    getPublicMessage,
    getCurrentUser,
    getCurrentAdmin,
} from "../controllers/users.controller.js"

export default class UserRouter extends CustomRouter {
    init() {
        this.get("/", handlePolicies(["PUBLIC"]), getPublicMessage)

        this.get(
            "/currentUser",
            handlePolicies(["USER", "ADMIN"]),
            getCurrentUser
        )
        this.get("/currentAdmin", handlePolicies(["ADMIN"]), getCurrentAdmin)
    }
}

 