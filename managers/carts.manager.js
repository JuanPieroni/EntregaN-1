import BaseManager from "./base.manager.js"
import CartsDAO from "./../dao/carts.dao.js"
import mongoose from "mongoose"

class CartManager extends BaseManager {
    constructor() {
        super(CartsDAO)
    }
    async findAllCarts() {
        return await CartsDAO.findAll()
    }

    async getCartById(cid) {
        return await CartsDAO.findById(cid)
    }

    async createCart() {
        const newCart = {
            products: [],
        }
        return await CartsDAO.createOne(newCart)
    }

    async updateCantidadProducto(cid, pid, cantidad) {
        const cart = await CartsDAO.findById(cid)
        if (!cart) return "Carrito no encontrado"

        const productoInCart = cart.products.find(
            (p) => p.product.toString() === pid
        )
        if (!productoInCart) return "Producto no encontrado en el carrito"
        if (!cantidad || isNaN(cantidad) || cantidad < 1) {
            return "Cantidad inválida"
        }
        productoInCart.cantidad = Number(cantidad)

        return await CartsDAO.updateOne(cid, {
            products: cart.products,
        })
    }

    async updateCartProducts(cid, productosActualizados) {
        const cart = await CartsDAO.findById(cid)
        if (!cart) return "Carrito no encontrado"

        const productosSeguros = productosActualizados.map((p) => ({
            product: new mongoose.Types.ObjectId(p.product),
            cantidad: p.cantidad ? Number(p.cantidad) : 1,
        }))

        return await CartsDAO.updateOne(cid, {
            products: productosSeguros,
        })
    }

    async deleteProductoCarrito(cid, pid) {
        const cart = await CartsDAO.findById(cid)
        if (!cart) return "Carrido no encontrado"

        cart.products = cart.products.filter(
            (p) => p.product.toString() !== pid
        )
        return await CartsDAO.updateOne(cid, {
            products: cart.products,
        })
    }

    async vaciarCarrito(cid) {
        const cart = await CartsDAO.findById(cid)
        if (!cart) return "carrito no encontraso"

        cart.products = []
        return await CartsDAO.updateOne(cid, {
            products: cart.products,
        })
    }

    async addProductToCart(cid, pid, cantidad) {
        const cart = await CartsDAO.findById(cid)
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

        return await CartsDAO.updateOne(cid, {
            products: cart.products,
        })
    }

    async getCartDetails(cid) {
        const carritoId = new mongoose.Types.ObjectId(cid)

        const detalle = [
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
        ]

        const result = await CartsDAO.aggregate(detalle)
        return result[0] || null
    }
}

export const cartsManager = new CartManager()
