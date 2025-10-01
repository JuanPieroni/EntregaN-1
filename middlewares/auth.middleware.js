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
} 

otra forma de hacerlo: 
 export const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({
                status: "error",
                message: "No autorizado",
            })
        }   
 next()
    }
}

-- diferencia entre 401 y 403:
401 Unauthorized: El usuario no está autenticado. Necesita iniciar sesión.
403 Forbidden: El usuario está autenticado pero no tiene permisos para acceder al recurso.
*/
