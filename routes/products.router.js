import { Router } from "express"
import { productsManager } from "../managers/products.manager.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const productos = await productsManager.findAllProducts(req.query)
        res.status(200).json({ status: "success", payload: productos })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await productsManager.findById(pid)

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" })
        }
        res.status(200).json({ status: "success", payload: producto })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const producto = req.body
        const nuevoProducto = await productsManager.createOne(producto)
        res.status(201).json({ status: "succes", payload: nuevoProducto })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const productoActualizado = await productsManager.updateOne(
            pid,
            req.body
        )
        if (!productoActualizado) {
            return res.status(404).json({ error: "Producto no encontrado" })
        }
        res.status(200).json({
            status: "success",
            payload: productoActualizado,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

 
router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const deletedProduct = await productsManager.deleteOne(pid)
        if (!deletedProduct.success) {
            return res.status(404).json({ error: deletedProduct.message })
        }

        res.status(200).json({
            status: "success",
            message: `Producto ${deletedProduct.data.title} eliminado`,
            deletedProduct: deletedProduct.data,
        })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
})

export default router
