import { Router } from "express"
import { authenticateJWT } from "../middlewares/auth.middleware.js"

/* import CustomRouter from "../utils/CustomRouter.js" */
import {
    register,
    login,
    logout,
    getCurrentUser,
    githubAuth,
    githubCallback,
    forgotPassword,
    resetPassword,
} from "../controllers/sessions.controller.js"

const sessionsRouter = Router()

sessionsRouter.post("/register", register)
sessionsRouter.post("/login", login)
sessionsRouter.post("/logout", logout)
sessionsRouter.get("/current", authenticateJWT, getCurrentUser)

sessionsRouter.post("/forgot-password", forgotPassword)
sessionsRouter.post("/reset-password", resetPassword)

// GitHub OAuth routes
sessionsRouter.get("/github", githubAuth)
sessionsRouter.get("/github/callback", githubCallback)

//Google oAuth routes
//Todo: igual que githiub, Google necestia dos gets .
// esta  a las 2:58:00 minutos de la clase 13 de la comision vieja .

export default sessionsRouter
