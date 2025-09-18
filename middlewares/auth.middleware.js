import { passport } from "../config/passport.config.js"

// Middleware para verificar JWT
export const authenticateJWT = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Error de autenticación",
            })
        }
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Token inválido o expirado",
            })
        }
        req.user = user
        next()
    })(req, res, next)
}

/* // Middleware para verificar roles
export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                status: "error", 
                message: "No autenticado" 
            })
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                status: "error", 
                message: "No autorizado" 
            })
        }
        next()
    }
} */
