import { transport } from "../config/mailer.config.js"
import config from "../config/env.config.js"

class MailService {
    async sendPasswordResetEmail(email, token) {
        const resetLink = `http://localhost:8080/reset-password?token=${token}`

        const mailOptions = {
            from: config.gmail.user,
            to: email,
            subject: "Recuperación de Contraseña - E-Commerce Coder BackEnd2",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h1 style="color: #333;">Recuperación de Contraseña</h1>
                    <p>Hola,</p>
                    <p>Recibimos una solicitud para restablecer tu contraseña.</p>
                    <p>Haz click en el siguiente botón para continuar:</p>
                    <a href="${resetLink}" 
                       style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                        Restablecer Contraseña
                    </a>
                    <p><strong>Este enlace expira en 1 hora.</strong></p>
                    <p>Si no solicitaste este cambio, ignora este email.</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">Este es un email automático, por favor no respondas.</p>
                </div>
            `,
        }

        return await transport.sendMail(mailOptions)
    }
}

export const mailService = new MailService()
