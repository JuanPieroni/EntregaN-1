// controllers/tickets.controller.js
import { ticketsService } from "../services/tickets.service.js"

export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params
        const userEmail = req.user.email

        const result = await ticketsService.processPurchase(cid, userEmail)

        if (!result.success) {
            return res.sendError(result.message)
        }

        // Respuesta exitosa
        const response = {
            ticket: result.ticket,
        }

        // Si hay productos no comprados, incluirlos
        if (result.productosNoComprados.length > 0) {
            response.productosNoComprados = result.productosNoComprados
            response.message = "Compra parcial: algunos productos no tenían stock"
        }

        res.sendSuccess(response, "Compra realizada con éxito")
    } catch (error) {
        console.error("Error en purchase:", error)
        res.sendServerError("Error al procesar la compra")
    }
}
