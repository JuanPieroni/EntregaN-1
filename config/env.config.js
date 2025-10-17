import dotenv from "dotenv"
import progam from "./commander.config.js"

const mode = progam.opts().mode
dotenv.config({
    path:
        mode === "dev"
            ? ".env.development"
            : mode === "test"
            ? ".env.testing"
            : ".env.production",
})

const config = {
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET,
    database: process.env.DATABASE || "mongo",

    mongodb: {
        local: process.env.MONGODB_LOCAL_URI,
        atlas: process.env.MONGODB_ATLAS_URI,
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
   google: { 
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    gmail: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
}

export default config
