import { productsService } from "./../services/products.service.js"

export const getAllProducts = async (req, res) => {
    try {
        const productos = await productsService.getAllProducts(req.query)
        res.sendSuccess(productos, "Lista de productos obtenida")
    } catch (error) {
        res.sendServerError()
    }
}

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await productsService.getProductById(pid)

        if (!producto.success) {
            return res.sendNotFound(producto.message)
        }
        res.sendSuccess(producto.data, "Producto encontrado")
    } catch (error) {
        res.sendServerError()
    }
}

//Todo: validar ? aca ? Si creo un producto con el mismo code me da server error.
export const createProduct = async (req, res) => {
    try {
        const producto = req.body
        const nuevoProducto = await productsService.createProduct(producto)
        res.sendCreated(nuevoProducto, "Producto creado exitosamente")
    } catch (error) {
        res.sendServerError("No se pudo crear el producto")
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const productoActualizado = await productsService.updateProduct(
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
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const deletedProduct = await productsService.deleteProduct(pid)
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
}
