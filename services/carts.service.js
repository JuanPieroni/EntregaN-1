import { cartsManager } from "../managers/carts.manager.js"

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

}

export const cartsService = new CartsService()