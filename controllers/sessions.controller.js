import { sessionsService } from "../services/sessions.service.js"
import { passport } from "../config/passport.config.js"

// POST /api/sessions/register
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

// POST /api/sessions/login
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

        // redirigir a profile
        res.redirect("/profile")
    })(req, res, next)
}

// POST /api/sessions/logout
export const logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
}

// GET /api/sessions/current
//Todo: agregar middleware distintos roles
export const getCurrentUser = (req, res) => {
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

// GET /api/sessions/github
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
