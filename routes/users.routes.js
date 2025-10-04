import CustomRouter from "../utils/CustomRouter.js"
import { handlePolicies } from "../middlewares/handlePolicies.js"

export default class UserRouter extends CustomRouter {
    init() {
        this.get("/", handlePolicies(["PUBLIC"]), (req, res) => {
            res.sendSuccess("Hola para todos!")
        })

        this.get(
            "/currentUser",
            handlePolicies(["USER", "ADMIN"]),
            (req, res) => {
                res.sendSuccess(req.user.email, "Email del usuario actual. Eres user o admin")
            }
        )

        this.get("/currentAdmin", handlePolicies(["ADMIN"]), (req, res) => {
            console.log(req.user)
            res.sendSuccess(req.user.email, "Email del admin actual. Eres admin")
        })
    }
}

// router.get('/', handlePolicies(["PUBLIC"]), (req, res) => {
//     res.send('Hola para todos!')
// })

// router.get('/currentUser', handlePolicies(["USER", "ADMIN"]), (req, res) => {
//     res.send(req.user.email)
// })

// router.get('/currentAdmin', handlePolicies(["ADMIN"]), (req, res) => {
//     console.log(req.user)
//     res.send(req.user.email)
// })

// export class UserRouter {
//     // HACER EN CASA
// }

// export default router
