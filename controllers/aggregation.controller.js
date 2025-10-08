import { cartsService } from "../services/carts.service.js"

export const getCartDetails = async (req, res) => {
    try {
        const { cid } = req.params

        const detalle = await cartsService.getCartDetails(cid)
        if (!detalle) {
            return res.sendNotFound("Carrito no encontrado")
        }

        res.sendSuccess(detalle, "Detalles del carrito obtenidos")
    } catch (error) {
        res.sendServerError("Error al obtener detalles del carrito")
    }
}
