import { Router } from "express"
import fs from "fs"
import path from "path"

const productsRouter = (manager) => {
    const router = Router()

 

  
    router.get("/:pid", (req, res) => {
        const id = parseInt(req.params.pid)
        const producto = manager.getProductById(id)
        if (producto) {
            res.status(200).json(producto)
        } else {
            res.status(404).json({ error: "Producto no encontrado" })
        }
    })

    router.post("/", (req, res) => {
        const datos = req.body
        const nuevoProducto = manager.addProduct(datos)
        res.status(201).json(nuevoProducto)
    })

    router.put("/:pid", (req, res) => {
        const id = parseInt(req.params.pid)
        const productos = manager.getProducts()
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

        fs.writeFileSync(manager.path, JSON.stringify(productos))
        res.status(200).json({
            message: `Producto ${producto.id} actualizado`,
            producto,
        })
    })

    router.delete("/:pid", (req, res) => {
        const id = parseInt(req.params.pid)
        let productos = manager.getProducts()
        const existe = productos.find((p) => p.id === id)

        if (!existe) {
            return res
                .status(404)
                .json({ mensaje: "No se pudo eliminar. Productto inexistente" })
        }
        productos = productos.filter((p) => p.id !== id)
        fs.writeFileSync(manager.path, JSON.stringify(productos))
        res.status(200).send(`Producto ${id}   eliminado`)
    })

    return router
}

export default productsRouter
