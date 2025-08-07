import { Router } from "express"
import fs from "fs"
import { io } from "../app.js"

const productsRouter = (manager) => {
    const router = Router()

    router.get("/", async (req, res) => {
        const productos = await manager.getProducts()
        res.status(200).json(productos)
    })

    router.get("/:pid", async (req, res) => {
        const id = parseInt(req.params.pid)
        const producto = await manager.getProductById(id)
        if (producto) {
            res.status(200).json(producto)
        } else {
            res.status(404).json({ error: "Producto no encontrado" })
        }
    })

    router.post("/", async (req, res) => {
        try {
            const datos = req.body
            const nuevoProducto = await manager.addProduct(datos)
            const productosActualizados = await manager.getProducts()
            io.emit("productosActualizados", productosActualizados)
            res.status(201).json(nuevoProducto)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })

    router.put("/:pid", async (req, res) => {
        const id = parseInt(req.params.pid)
        const productos = await manager.getProducts()
        const producto = productos.find((p) => p.id === id)
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" })
        }
        const { title, description, price, code, stock } = req.body
        if (title) producto.title = title
        if (description) producto.description = description
        if (price) producto.price = price
        if (code) producto.code = code
        if (stock) producto.stock = stock

        /*  fs.writeFileSync(manager.path, JSON.stringify(productos)) */
        await manager.saveProducts(productos)
        res.status(200).json({
            message: `Producto ${producto.id} actualizado`,
            producto,
        })
    })

    router.delete("/:pid", async (req, res) => {
        const id = parseInt(req.params.pid)
        let productos = await manager.getProducts()
        const existe = productos.find((p) => p.id === id)

        if (!existe) {
            return res
                .status(404)
                .json({ mensaje: "No se pudo eliminar. Productto inexistente" })
        }
        productos = productos.filter((p) => p.id !== id)

        /* fs.writeFileSync(manager.path, JSON.stringify(productos)) */
        await manager.saveProducts(productos)
        io.emit("productosActualizados", productos)
        res.status(200).send(
            `El producto con id ${id} ${existe.title} fue eliminado. `
        )
    })

    return router
}

export default productsRouter
