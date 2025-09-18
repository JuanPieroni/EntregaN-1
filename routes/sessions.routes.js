import { Router } from "express"
import { passport, JWT_SECRET } from "../config/passport.config.js"
import { usersManager } from "../managers/users.manager.js"
import { cartsManager } from "../managers/carts.manager.js"
import { hashPassword } from "../utils/auth.utils.js"
import { authenticateJWT } from "../middlewares/auth.middleware.js"
import jwt from "jsonwebtoken"

const sessionsRouter = Router()

// POST /api/sessions/register
sessionsRouter.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        // Verificar si el usuario ya existe
        const existingUser = await usersManager.findByEmail(email)
        if (existingUser.success) {
            return res.render("register", { error: true })
        }

        // Crear carrito para el usuario
        const newCart = await cartsManager.createCart()

        // Crear nuevo usuario con carrito asignado
        const hashedPassword = hashPassword(password)
        const newUser = await usersManager.createOne({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart: newCart._id,
            role: "user",
        })

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

        res.redirect("/login")
    } catch (error) {
        res.render("register", { error: true })
    }
})

// POST /api/sessions/login
sessionsRouter.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return res.render("login", { error: true })
        }
        if (!user) {
            return res.render("login", { error: true })
        }

        //. JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "15m" }
        )

        // Estab. cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        })

        // Redirigir a profile
        res.redirect("/profile")
    })(req, res, next)
})

// POST /api/sessions/logout
sessionsRouter.post("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
})

// GET /api/sessions/current
sessionsRouter.get("/current", authenticateJWT, (req, res) => {
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
})

export default sessionsRouter
