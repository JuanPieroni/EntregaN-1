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
        if (!cart) return "Carrito no encontrado"

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
        if (!cart) return "Carrito no encontrado"

        const productoInCart = cart.products.find(
            (p) => p.product.toString() === pid
        )
        if (!productoInCart) return "Producto no encontrado en el carrito"

        productoInCart.cantidad = cantidad

        const carritoActualizado = await cart.save()
        return carritoActualizado
    }

    async updateCartProducts(cid, productosActualizados) {
        const cart = await this.model.findById(cid)
        if (!cart) return "Carrito no encontrado"
        cart.products = productosActualizados
        const carritoActualizado = await cart.save()
        return carritoActualizado
    }

    async deleteProductoCarrito(cid, pid) {
        const cart = await this.model.findById(cid)
        if (!cart) return "Carrido no encontrado"

        cart.products = cart.products.filter(
            (p) => p.product.toString() !== pid
        )
        const carritoActualizado = await cart.save()
        return carritoActualizado
    }

    async vaciarCarrito(cid) {
        const cart = await this.model.findById(cid)
        if (!cart) return "carrito no encontraso"

        cart.products = []

        const carritoVacio = await cart.save()
        return carritoVacio
    }
}

export const cartsManager = new CartsManager()
