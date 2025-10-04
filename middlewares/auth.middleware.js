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



/* -- diferencia entre 401 y 403:
401 Unauthorized: El usuario no está autenticado. Necesita iniciar sesión.
403 Forbidden: El usuario está autenticado pero no tiene permisos para acceder al recurso.

 */