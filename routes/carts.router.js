import { Router } from "express"
import { cartsManager } from "../managers/carts.manager.js"
import { aggregateCarrito } from "../controllers/aggregation.controller.js"
import mongoose from "mongoose"
import { cartsModel } from "../models/cart.model.js"
import { productsModel } from "../models/product.model.js"

const router = Router()

router.post("/", async (req, res) => {
    const cart = await cartsManager.createCart()
    res.status(201).json({
        mensaje: `El carrito fue creado con exito`,
        status: "success",
        payload: cart,
    })
})

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { cantidad } = req.body
        const cart = await cartsManager.updateCantidadProducto(
            cid,
            pid,
            cantidad
        )
        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const nuevoProducto = req.body.products
        const cart = await cartsManager.updateCartProducts(cid, nuevoProducto)
        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartsManager.deleteProductoCarrito(cid, pid)
        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message })
    }
})

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const carritoVacio = await cartsManager.vaciarCarrito(cid)
        res.status(200).json({ status: "success", payload: carritoVacio })
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message })
    }
})

router.get("/", async (req, res) => {
    try {
        const cart = await cartsManager.findAll()
        res.status(200).json({ title: "Api carts", cart })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
})

router.get("/:cid", async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartsManager.model
            .findById(cid)
            .populate("products.product")
        if (!cart) {
            return res
                .status(404)
                .json({ status: "error", message: "Carrito no encontrado" })
        }
        res.status(200).json({ status: "success", payload: cart.products })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
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

        const existe = cart.products.find((p) => p.product.toString() === pid)

        if (existe) {
            existe.cantidad += cantidad
        } else {
            cart.products.push({ product: product._id, cantidad })
        }
        await cart.save()

        res.status(202).json({
            message: `El Producto ${product.title} fue agregado al carrito`,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
