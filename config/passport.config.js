import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt"
import { usersManager } from "../managers/users.manager.js"
import { comparePassword } from "../utils/auth.utils.js"

const JWT_SECRET = "coderhouse_secret_key"

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




export { passport, JWT_SECRET }
