import nodemailer from "nodemailer"
import config from "./env.config.js"

export const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.gmail.user,
        pass: config.gmail.pass,
    },
})

transport.verify((error, success) => {
    if (error) {
        console.error("error en la config de email:", error)
    } else {
        console.log("Servidor de email listo")
    }
})
