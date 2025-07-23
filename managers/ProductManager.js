import fs from "fs"
 
class ProductManager {
    constructor(path) {
        this.path = path
    }
    getProducts() {
        if (!fs.existsSync(this.path)) {
            return []
        }
        const contenido = fs.readFileSync(this.path, "utf-8")
        return JSON.parse(contenido)
    }

    addProduct(producto) {
        const productos = this.getProducts()
        const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1
        const nuevoProducto = { id: nuevoId, ...producto }
        productos.push(nuevoProducto)
        fs.writeFileSync(this.path, JSON.stringify(productos))
        return nuevoProducto
    }

    getProductById(id) {
        const productos = this.getProducts()
        return productos.find((p) => p.id === parseInt(id))
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
