import { Router } from "express"
import { authenticateJWT } from "../middlewares/auth.middleware.js"
import {
    renderCarts,
    renderCart,
    renderProducts,
    renderLogin,
    renderRegister,
    renderProfile,
    renderCompraSuccess,
} from "../controllers/views.controller.js"
import { handlePolicies } from "../middlewares/handlePolicies.js"

const viewsRouter = Router()

viewsRouter.get("/products", authenticateJWT, renderProducts)
viewsRouter.get("/cart/:cid", renderCart)
viewsRouter.get("/carts", handlePolicies(["ADMIN"]), renderCarts)
viewsRouter.get("/login", renderLogin)
viewsRouter.get("/register", renderRegister)
viewsRouter.get("/profile", authenticateJWT, renderProfile)
viewsRouter.post("/cart/:cid/purchase", authenticateJWT, renderCompraSuccess)

export default viewsRouter
