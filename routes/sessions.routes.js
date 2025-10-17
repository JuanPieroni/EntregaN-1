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
    googleAuth,
    googleCallback
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
sessionsRouter.get("/google", googleAuth)
sessionsRouter.get("/google/callback", googleCallback)


export default sessionsRouter
