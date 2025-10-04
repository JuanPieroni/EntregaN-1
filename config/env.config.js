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
    useAtlas: process.env.USE_ATLAS === "true",

    mongodb: {
        local: process.env.MONGODB_LOCAL_URI,
        atlas: process.env.MONGODB_ATLAS_URI,
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL : process.env.GITHUB_CALLBACK_URL
    },
}

export default config
