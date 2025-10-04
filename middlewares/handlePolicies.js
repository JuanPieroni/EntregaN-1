import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/passport.config.js"
//Middleware para manejar políticas de acceso basado en role

export const handlePolicies = (policies) => (req, res, next) => {
    //si la primera política es PUBLIC, cualquiera puede acceder
    if (policies[0] === "PUBLIC") return next()
    // obtener token desde cookies ,
    const token = req.cookies.token
    if (!token) {
        return res
            .status(401)
            .send({ status: "error", error: "Token Requerido" })
    }

    try {
        const user = jwt.verify(token, JWT_SECRET)
        if (!policies.includes(user.role.toUpperCase())) {
            return res
                .status(403)
                .send({ status: "error", error: "Sin permiso suficuente" })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({ status: "error", error: "server error" })
    }
}
