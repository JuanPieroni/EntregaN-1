import { productsManager } from "../managers/products.manager.js"
import CustomRouter from "../utils/CustomRouter.js"

const productsRouter = new CustomRouter()

productsRouter.get("/", async (req, res) => {
    try {
        const productos = await productsManager.findAllProducts(req.query)
        res.sendSuccess(productos, "Lista de productos obtenida")
    } catch (error) {
        res.sendServerError()
    }
})
productsRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await productsManager.findById(pid)
        

        if (!producto.success) {
            return res.sendNotFound(producto.message)
        }
        res.sendSuccess(producto.data, "Producto encontrado")
    } catch (error) {
        res.sendServerError()
    }
})

productsRouter.post("/", async (req, res) => {
    try {
        const producto = req.body
        const nuevoProducto = await productsManager.createOne(producto)
        res.sendCreated(nuevoProducto, "Producto creado exitosamente")
    } catch (error) {
        res.sendServerError()
    }
})

productsRouter.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const productoActualizado = await productsManager.updateOne(
            pid,
            req.body
        )
        if (!productoActualizado.success) {
            return res.sendNotFound(productoActualizado.message)
        }
        res.sendSuccess(
            productoActualizado.data,
            "Producto actualizado exitosamente"
        )
    } catch (error) {
        res.sendServerError()
    }
})

productsRouter.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const deletedProduct = await productsManager.deleteOne(pid)
        if (!deletedProduct.success) {
            return res.sendNotFound(deletedProduct.message)
        }

        res.sendSuccess(
            deletedProduct.data,
            `Producto ${deletedProduct.data.title} eliminado`
        )
    } catch (error) {
        res.sendServerError("Error al eliminar producto")
    }
})

export default productsRouter.getRouter()
