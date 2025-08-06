import { promises as fs } from "fs"

class ProductManager {
    constructor(path) {
        this.path = path
    }
    async getProducts() {
        try {
            await fs.access(this.path)
            const contenido = await fs.readFile(this.path, "utf-8")
            return JSON.parse(contenido)
        } catch (error) {
            return []
        }
    }

    async addProduct(producto) {
        const { title, description, code, price, stock } = producto
        if (!title || !description || !code || !price || !stock) {
            throw new Error("Todos los campos son obligatorios")
        }

        const productos = await this.getProducts()
        const codigorepetido = productos.some((p) => p.code === code)
        if (codigorepetido) {
            throw new Error("El código del producto ya existe")
        }
        const nuevoId =
            productos.length > 0 ? productos[productos.length - 1].id + 1 : 1
        const nuevoProducto = { id: nuevoId, ...producto }
        productos.push(nuevoProducto)
        await fs.writeFile(this.path, JSON.stringify(productos))
        return nuevoProducto
    }



    async getProductById(id) {
        const productos = await this.getProducts()
        return productos.find((p) => p.id === parseInt(id))
    }
    
    
    async restarStock(id) {
        const productos = await this.getProducts()
        const producto = productos.find((p) => p.id === parseInt(id))
        if (!producto || producto.stock <= 0) return null

        producto.stock--
       await fs.writeFile(this.path, JSON.stringify(productos))
        return producto
    }
}

// prueba
// const producto1 = new ProductManager("productos.json")
// producto1.addProduct({
//     title: "Monitor",
//     description: "ASUS 27",
//     price: 100,
//     code: "ABC123",
//     stock: 10,
// })
//se crea bien el productos.json
export default ProductManager
