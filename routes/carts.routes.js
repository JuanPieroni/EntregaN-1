import { cartsManager } from "../managers/carts.manager.js"
import { aggregateCarrito } from "../controllers/aggregation.controller.js"
import { cartsModel } from "../models/cart.model.js"
import { productsModel } from "../models/product.model.js"
import { getAllCarts, getCartById, createCart } from "../controllers/carts.controller.js"
import CustomRouter from "../utils/CustomRouter.js"
import { create } from "express-handlebars"

const cartsRouter = new CustomRouter()
cartsRouter.get("/",getAllCarts)
cartsRouter.get("/:cid", getCartById)
cartsRouter.post("/",createCart)










cartsRouter.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const nuevoProducto = req.body.products
        const cart = await cartsManager.updateCartProducts(cid, nuevoProducto)
        res.sendSuccess(cart, "Carrito actualizado con exito")
    } catch (error) {
        res.sendServerError("Error al actualizar carrito")
    }
})


















cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { cantidad } = req.body
        const cart = await cartsManager.updateCantidadProducto(
            cid,
            pid,
            cantidad
        )
        res.sendSuccess(cart, "Cantidad actualizada con exito")
    } catch (error) {
        res.sendServerError("Error al actualizar cantidad")
    }
})

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartsManager.deleteProductoCarrito(cid, pid)
        res.sendSuccess(cart, "Producto eliminado con exito")
    } catch (error) {
        res.sendServerError("Error al eliminar producto")
    }
})

cartsRouter.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const carritoVacio = await cartsManager.vaciarCarrito(cid)
        res.sendSuccess(carritoVacio, "Carrito vaciado con éxito")
    } catch (error) {
        res.sendServerError("Error al vaciar carrito")
    }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        let { cantidad = 1 } = req.body || {}
        cantidad = Number(cantidad)

        const cart = await cartsModel.findById(cid)
        const product = await productsModel.findById(pid)
        console.log("cart ", cart)
        console.log("product", product)

        if (!cart || !product) {
            return res
                .status(404)
                .json({ error: "carrito o producto no encontrado" })
        }
        // Verificar stock disponible
        if (product.stock < cantidad) {
            return res.status(400).json({ error: "Stock insuficiente" })
        }
        const existe = cart.products.find((p) => p.product.toString() === pid)

        if (existe) {
            existe.cantidad += cantidad
        } else {
            cart.products.push({ product: product._id, cantidad })
        }
        await cart.save()
        // Restar stock del producto
        product.stock -= cantidad
        // Guardar ambos
        await cart.save()
        await product.save()

        res.sendSuccess(cart, `Producto ${product.title} agregado exitosamente`)
    } catch (error) {
        res.sendServerError("Error al agregar producto al carrito")
    }
})

cartsRouter.get("/:cid/detalle", aggregateCarrito)

export default cartsRouter.getRouter()
