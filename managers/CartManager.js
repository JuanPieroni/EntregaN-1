import { promises as fs } from "fs"

class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCarts() {
        try {
            await fs.access(this.path)
            const contenido = await fs.readFile(this.path, "utf-8")
            return contenido ? JSON.parse(contenido) : []
        } catch (error) {
            return []
        }
    }
    async saveCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    async createCart() {
        const carts = await this.getCarts()
        const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1
        const newCart = { id: newId, productos: [] }
        carts.push(newCart)
        await this.saveCarts(carts)
        return newCart
    }

    async getCartById(id) {
        const carts = await this.getCarts()
        return carts.find((c) => c.id === parseInt(id))
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts()
        const cart = carts.find((c) => c.id === parseInt(cid))
        if (!cart) return null

        const producto = cart.productos.find(
            (p) => p.producto === parseInt(pid)
        )
        if (producto) {
            producto.cantidad++
        } else {
            cart.productos.push({ producto: parseInt(pid), cantidad: 1 })
        }

        await this.saveCarts(carts)
        return cart
    }

    async saveCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }
}
export default CartManager
