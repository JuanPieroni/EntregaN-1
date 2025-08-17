import BaseManager from "./base.manager.js"
import { cartsModel } from "../models/cart.model.js"
import mongoose from "mongoose"

class CartManager extends BaseManager {
    constructor() {
        super(cartsModel)
    }
    async findAllCarts() {
        return this.model.find().populate("products.product").lean()
    }

    async getCartById(cid) {
        const cart = await this.model
            .findById(cid)
            .populate("products.product")
            .lean()
        return cart
    }

    async createCart() {
        const newCart = {
            products: [],
        }

        const createdCart = await this.createOne(newCart)
        return createdCart
    }

    async updateCantidadProducto(cid, pid, cantidad) {
        const cart = await this.model.findById(cid)
        if (!cart) return "Carrito no encontrado"

        const productoInCart = cart.products.find(
            (p) => p.product.toString() === pid
        )
        if (!productoInCart) return "Producto no encontrado en el carrito"
        if (!cantidad || isNaN(cantidad) || cantidad < 1) {
            return "Cantidad inválida"
        }
        productoInCart.cantidad = Number(cantidad)

        const carritoActualizado = await cart.save()
        return carritoActualizado
    }

    async updateCartProducts(cid, productosActualizados) {
        const cart = await this.model.findById(cid)
        if (!cart) return "Carrito no encontrado"

        const productosSeguros = productosActualizados.map((p) => ({
            product: new mongoose.Types.ObjectId(p.product),
            cantidad: p.cantidad ? Number(p.cantidad) : 1,
        }))

        cart.products = productosSeguros
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

export const cartsManager = new CartManager()
