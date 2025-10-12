import { sessionsService } from "../services/sessions.service.js"
import { passport } from "../config/passport.config.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/passport.config.js"
import { mailService } from "../services/mail.service.js"
import { hashPassword, comparePassword } from "../utils/auth.utils.js"
import usersRepository from "../repositories/users.repository.js"

export const register = async (req, res) => {
    try {
        const result = await sessionsService.registerUser(req.body)

        if (!result.success) {
            return res.render("register", { error: true })
        }

        res.redirect("/login")
    } catch (error) {
        res.render("register", { error: true })
    }
}

export const login = (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return res.render("login", { error: true })
        }
        if (!user) {
            return res.render("login", { error: true })
        }

        // generar JWT token usando el service
        const token = sessionsService.generateToken(user)

        //gestablecer cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        })

        res.redirect("/profile")
    })(req, res, next)
}

export const logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
}

export const getCurrentUser = (req, res) => {
    res.json({
        status: "success",
        payload: req.user,
    })
}

export const githubAuth = passport.authenticate("github", {
    scope: ["user:email"],
})

// GET /api/sessions/github/callback
export const githubCallback = (req, res, next) => {
    passport.authenticate("github", { session: false }, (err, user) => {
        if (err) {
            console.error("GitHub auth error:", err)
            return res.redirect("/login?error=github_error")
        }
        if (!user) {
            return res.redirect("/login?error=github_failed")
        }

        try {
            console.log("GitHub callback user:", user)

            // Generar token usando el service
            const token = sessionsService.generateToken(user)

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
            })

            res.redirect("/products")
        } catch (error) {
            console.error("GitHub callback error:", error)
            res.redirect("/login?error=callback_error")
        }
    })(req, res, next)
}

//*  Solicitar recuperación de contraseña */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        // Buscar usuario
        const result = await usersRepository.findByEmailSinDTO(email)
        if (!result.success) {
            // Por seguridad, no revelar si el email existe o no
            return res.render("forgot-password", {
                success: true,
                message:
                    "Si el email existe, recibirás un enlace de recuperación",
            })
        }

        // Generar token con expiración de 1 hora
        const token = jwt.sign(
            { id: result.data._id, email: result.data.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        )

        // Enviar email
        await mailService.sendPasswordResetEmail(email, token)

        res.render("forgot-password", {
            success: true,
            message: "Email enviado. Revisa tu bandeja de entrada.",
        })
    } catch (error) {
        console.error("Error en forgotPassword:", error)
        res.render("forgot-password", {
            error: true,
            message: "Error al enviar el email",
        })
    }
}

// Resetear contraseña
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body

        const decoded = jwt.verify(token, JWT_SECRET)

        const result = await usersRepository.findByEmailSinDTO(decoded.email)
        if (!result.success) {
            return res.render("reset-password", {
                error: true,
                message: "Usuario no encontrado",
            })
        }

        const user = result.data

        if (comparePassword(newPassword, user.password)) {
            return res.render("reset-password", {
                error: true,
                message: "La nueva contraseña debe ser diferente a la anterior",
                token,
            })
        }

        const hashedPassword = hashPassword(newPassword)
        await usersRepository.updateOne(user._id, { password: hashedPassword })

        res.render("reset-password", {
            success: true,
            message: "Contraseña actualizada correctamente",
        })
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.render("reset-password", {
                error: true,
                message: "El enlace ha expirado. Solicita uno nuevo.",
            })
        }

        console.error("Error en resetPassword:", error)
        res.render("reset-password", {
            error: true,
            message: "Error al restablecer contraseña",
        })
    }
}
