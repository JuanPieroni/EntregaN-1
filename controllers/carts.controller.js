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

export const updateProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { cantidad } = req.body
        const cart = await cartsService.updateProductInCart(cid, pid, cantidad)
        res.sendSuccess(cart, "Cantidad actualizada con exito")
    } catch (error) {
        res.sendServerError("Error al actualizar cantidad")
    }
}

export const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartsService.removeProductFromCart(cid, pid)
        res.sendSuccess(cart, "Producto eliminado con exito")
    } catch (error) {
        res.sendServerError("Error al eliminar producto")
    }
}

export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params
        const carritoVacio = await cartsService.clearCart(cid)
        res.sendSuccess(carritoVacio, "Carrito vaciado con éxito")
    } catch (error) {
        res.sendServerError("Error al vaciar carrito")
    }
}

export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        let { cantidad = 1 } = req.body || {}
        cantidad = Number(cantidad)

        const result = await cartsService.addProductToCart(cid, pid, cantidad)

        if (!result.success) {
            if (result.message === "Stock insuficiente") {
                return res.sendError(result.message)
            }
            res.sendNotFound(res, result.message)
        }

        res.sendSuccess(result.data, "Producto agregado exitosamente")
    } catch (error) {
        res.sendServerError("Error al agregar producto al carrito")
    }
}
