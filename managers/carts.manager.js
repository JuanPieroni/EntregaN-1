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

    async addProductToCart(cid, pid, cantidad) {
        const cart = await this.model.findById(cid)
        if (!cart) return "Carrito no encontrado"

        const productoInCart = cart.products.find(
            (p) => p.product.toString() === pid
        )
        if (productoInCart) {
            productoInCart.cantidad += Number(cantidad)
        } else {
            cart.products.push({
                product: new mongoose.Types.ObjectId(pid),
                cantidad: Number(cantidad),
            })
        }

        const carritoActualizado = await cart.save()
        return carritoActualizado
    }

    async getCartDetails(cid) {
        try {
            const carritoId = new mongoose.Types.ObjectId(cid)

            const detalle = await this.model.aggregate([
                { $match: { _id: carritoId } },
                { $unwind: "$products" },
                {
                    $lookup: {
                        from: "products",
                        localField: "products.product",
                        foreignField: "_id",
                        as: "productoDetalle",
                    },
                },
                { $unwind: "$productoDetalle" },
                {
                    $project: {
                        _id: 0,
                        producto: "$productoDetalle.title",
                        cantidad: "$products.cantidad",
                        precioUnitario: "$productoDetalle.price",
                        precioTotal: {
                            $multiply: [
                                "$products.cantidad",
                                "$productoDetalle.price",
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        productos: { $push: "$$ROOT" },
                        total: { $sum: "$precioTotal" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        productos: 1,
                        total: 1,
                    },
                },
            ])

            return detalle[0] || null
        } catch (error) {
            throw error
        }
    }
}

export const cartsManager = new CartManager()
