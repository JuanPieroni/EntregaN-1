import { cartsService } from "../services/carts.service.js"

export const getAllCarts = async (req, res) => {
    try {
        const carts = await cartsService.getAllCarts()
        res.sendSuccess(carts, "Carritos obtenidos con éxito")
    } catch (error) {
        res.sendServerError("Error al obtener carritos")
    }
}

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartsService.getCartById(cid)
        if (!cart) {
            //todo validar aca con [a-zA-Z]+ o algo asi
            return res.sendNotFound("Carrito no encontrado")
        }
        res.sendSuccess(cart, "Carrito obtenido con éxito")
    } catch (error) {
        res.sendNotFound(
            "Error al obtener carrito, ID inválido o no encontrado"
        )
    }
}

export const createCart = async (req, res) => {
    const cart = await cartsService.createCart()
    res.sendCreated(cart, "Carrito creado con exito")
}

export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params
        const products = req.body.products
        const cart = await cartsService.updateCart(cid, products)
        res.sendSuccess(cart, "Carrito actualizado con exito")
    } catch (error) {
        res.sendServerError("Error al actualizar carrito")
    }
}
