import { Router } from "express"
import { authenticateJWT } from "../middlewares/auth.middleware.js"
import {
    renderCarts,
    renderCart,
    renderProducts,
    renderLogin,
    renderRegister,
    renderProfile,
} from "../controllers/views.controller.js"

const viewsRouter = Router()



viewsRouter.get("/products", authenticateJWT, renderProducts)
viewsRouter.get("/cart/:cid", renderCart)
viewsRouter.get("/carts", renderCarts)
viewsRouter.get("/login", renderLogin)
viewsRouter.get("/register", renderRegister)
viewsRouter.get("/profile", authenticateJWT, renderProfile)

export default viewsRouter
