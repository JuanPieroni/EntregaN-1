import fs from "fs"
 

class CartManager {
    constructor(path) {
        this.path = path
    }

    getCarts() {
        if (!fs.existsSync(this.path)) return []
        const contenido = fs.readFileSync(this.path, "utf-8")
        return JSON.parse(contenido)
    }
    saveCarts(carts) {
        fs.writeFileSync(this.path, JSON.stringify(carts))
    }
    createCart() {
        const carts = this.getCarts()
        const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1
        const newCart = {  id: newId, productos: [] }
        carts.push(newCart)
        this.saveCarts(carts)
        return newCart
    }
    getCartById(id) {
        const carts = this.getCarts()
        return carts.find((c) => c.id === parseInt(id)) 
    }
    addProductToCart(cid, pid) {
        const carts = this.getCarts()
        const cart = carts.find((c) => c.id === parseInt(cid))
        if (!cart) return null

        const producto = cart.productos.find((p) => p.producto === parseInt(pid))
        if (producto) {
            producto.cantidad++
        } else {
            cart.productos.push({ producto: parseInt(pid), cantidad: 1 })
        }

        this.saveCarts(carts)
        return cart
    }
}

export default CartManager
