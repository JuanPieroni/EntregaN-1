import { cartsManager } from "../managers/carts.manager.js"
import { hashPassword } from "../utils/auth.utils.js"
import { JWT_SECRET } from "../config/passport.config.js"
import jwt from "jsonwebtoken"
import usersRepository from "../repositories/users.repository.js"

class SessionsService {
    async registerUser(userData) {
        const { first_name, last_name, email, age, password } = userData

        // Verificar si el usuario ya existe
        const existingUser = await usersRepository.findByEmail(email)
        if (existingUser.success) {
            return { success: false, message: "Usuario ya existe" }
        }

        // Crear carrito para el usuario
        const newCart = await cartsManager.createCart()

        // Crear nuevo usuario con carrito asignado
        const hashedPassword = hashPassword(password)
        const newUser = await usersRepository.createOne({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart: newCart._id,
            role: "USER",
        })

        // Todo: Login automático tras registro
        /*      // Login automático tras registro
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: "15m" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
        }) */

        return { success: true, user: newUser.data }
    }

    generateToken(user) {
        // Generar JWT token
        const token = jwt.sign(
            { id: user._id || user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "15m" }
        )
        return token
    }

    async handleGitHubUser(user) {
        // Generar token para usuario de GitHub
        const token = this.generateToken(user)
        return { success: true, token }
    }
}

export const sessionsService = new SessionsService()
