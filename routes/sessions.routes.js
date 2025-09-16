import { Router } from "express"
import { passport, JWT_SECRET } from "../config/passport.config.js"
import { usersManager } from "../managers/users.manager.js"
import { hashPassword } from "../utils/auth.utils.js"
import jwt from "jsonwebtoken"

const sessionsRouter = Router()

// POST /api/sessions/register
sessionsRouter.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        // Verificar si el usuario ya existe
        const existingUser = await usersManager.findByEmail(email)
        if (existingUser.success) {
            return res.status(400).json({
                status: "error",
                message: "El usuario ya existe",
            })
        }

        // Crear nuevo usuario
        const hashedPassword = hashPassword(password)
        const newUser = await usersManager.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role: "user",
        })

        res.status(201).json({
            status: "success",
            message: "Usuario registrado exitosamente",
            payload: {
                id: newUser._id,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
            },
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
})

// POST /api/sessions/login
sessionsRouter.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: err.message,
            })
        }
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: info.message,
            })
        }

        // Genero JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "24h" }
        )

        // Establecer cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
        })

        res.json({
            status: "success",
            message: "Login exitoso",
            payload: {
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
            },
        })
    })(req, res, next)
})

// POST /api/sessions/logout
sessionsRouter.post("/logout", (req, res) => {
    res.clearCookie("token")
    res.json({
        status: "success",
        message: "Logout exitoso",
    })
})

// GET /api/sessions/current
sessionsRouter.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({
            status: "success",
            payload: {
                id: req.user._id,
                email: req.user.email,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                role: req.user.role,
            },
        })
    }
)

export default sessionsRouter
