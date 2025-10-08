import { cartsManager } from "../managers/carts.manager.js"
import { productsManager } from "../managers/products.manager.js"

class CartsService {
    async getAllCarts() {
        return await cartsManager.findAllCarts()
    }

    async getCartById(id) {
        return await cartsManager.getCartById(id)
    }
    async createCart() {
        return await cartsManager.createCart()
    }
    async updateCart(cid, products) {
        return await cartsManager.updateCartProducts(cid, products)
    }
    async updateProductInCart(cid, pid, cantidad) {
        return await cartsManager.updateCantidadProducto(cid, pid, cantidad)
    }
    async removeProductFromCart(cid, pid) {
        return await cartsManager.deleteProductoCarrito(cid, pid)
    }
    async clearCart(cid) {
        return await cartsManager.vaciarCarrito(cid)
    }
    async addProductToCart(cid, pid, cantidad) {
      
        const product = await productsManager.findById(pid)
        if (!product.success) {
            return { success: false, message: "Producto no encontrado" }
        }
         
        if (product.data.stock < cantidad) {
            return { success: false, message: "Stock insuficiente" }
        }
        
        
        
        const cart = await cartsManager.addProductToCart(cid, pid, cantidad)
        if (typeof cart === "string") {
            return { success: false, message: cart }
        }
        
       
        await productsManager.updateOne(pid, { 
            stock: product.data.stock - cantidad 
        })
        
        return { success: true, data: cart }
    }
}


    


export const cartsService = new CartsService()
