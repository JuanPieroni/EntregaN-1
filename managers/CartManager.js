import BaseManager from "./BaseManager.js"
import { cartsModel } from "../models/carts.model.js"

class CartsManager extends BaseManager {
    constructor() {
        super(cartsModel)
    }

    async createCart() {
        const newCart = {
            products: [],
        }

        const createdCart = await this.model.create(newCart)
        return createdCart
    }

    async addProductToCart(cid, pid, cantidad = 1) {
        const cart = await this.model.findById(cid)
        if (!cart) throw new Error("Carrito no encontrado")

        const existe = cart.products.find((p) => p.product.toString() === pid)

        if (existe) {
            existe.cantidad += cantidad
        } else {
            cart.products.push({ product: pid, cantidad })
        }

        const updatedCart = await cart.save()
        return updatedCart
    }
    // PUT api/carts/:cid/products/:pid

    async updateCantidadProducto(cid, pid, cantidad) {
        const cart = await this.model.findById(cid)
        if (!cart) throw new Error("Carrito no encontrado")

        const productoInCart = cart.products.find(
            (p) => p.product.toString() === pid
        )
        if (!productoInCart)
            throw new Error("Producto no encontrado en el carrito")

        productoInCart.cantidad = cantidad

        const updatedCart = await cart.save()
        return updatedCart
    }

    async updateCartProducts(cid, productosActualizados) {
        const cart = await this.model.findById(cid)
        if (!cart) throw new Error("Carrito no encontrado")
        cart.products = productosActualizados
        const updatedCart = await cart.save()
        return updatedCart
    }

    async deleteProductoCarrito (cid, pid){
        
    }


}

export const cartsManager = new CartsManager()
