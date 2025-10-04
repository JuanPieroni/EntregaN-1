import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt"
import { Strategy as GitHubStrategy } from "passport-github2"
import { usersManager } from "../managers/users.manager.js"
import { cartsManager } from "../managers/carts.manager.js"
import { comparePassword } from "../utils/auth.utils.js"
import config from "./env.config.js"

const JWT_SECRET = config.jwtSecret

// Local Strategy para login
passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const result = await usersManager.findByEmail(email)
                if (!result.success) {
                    return done(null, false, {
                        message: "Usuario no encontrado",
                    })
                }

                const user = result.data
                if (!comparePassword(password, user.password)) {
                    return done(null, false, {
                        message: "Contraseña incorrecta",
                    })
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

// JWT Strategy para autenticación
passport.use(
    "jwt",
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req.cookies?.token || null,
            ]),
            secretOrKey: JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const result = await usersManager.findById(payload.id)
                if (!result.success) {
                    return done(null, false)
                }
                // Convertir a objeto plano para hbss
                const user = result.data.toObject
                    ? result.data.toObject()
                    : result.data
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

// GIT HUB Strategy
passport.use(
    "github",
    new GitHubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: config.github.callbackURL,
        },

        async (accessToken, refreshToken, profile, done) => {
            console.log("=== GITHUB STRATEGY EJECUTADA ===")
            console.log("Profile recibido:", profile)
            console.log("Access token:", accessToken ? "✓" : "✗")
            try {
                const githubId = profile._json.login //
                console.log("GitHub ID:", githubId)
                const email =
                    profile._json.email ||
                    profile.emails?.[0]?.value ||
                    `${profile._json.login}@github.local`

                console.log("Email obtenido:", email)

                // Buscar usuario existente
                const existingUser = await usersManager.findByEmail(email)
                if (existingUser.success) {
                    console.log("Usuario existente encontrado")
                    return done(null, existingUser.data)
                }

                console.log("Creando nuevo usuario...")

                // Crear carrito y usuario nuevo
                const newCart = await cartsManager.createCart()
                const newUser = {
                    first_name: profile._json.name?.split(" ")[0] || "GitHub",
                    last_name: profile._json.name?.split(" ")[1] || "User",
                    email: email,
                    age: 18,
                    password: "github_oauth_user",
                    cart: newCart._id,
                    role: "user",
                    fromGitHub: true,
                }

                const createdUser = await usersManager.createOne(newUser)
                return done(null, createdUser)
            } catch (error) {
                console.error("GitHub Strategy error:", error)
                return done(error)
            }
        }
    )
)

// GOOGLE STRATEGY
// ToDo

export { passport, JWT_SECRET }
