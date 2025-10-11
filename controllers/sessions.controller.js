import { sessionsService } from "../services/sessions.service.js"
import { passport } from "../config/passport.config.js"
 

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
