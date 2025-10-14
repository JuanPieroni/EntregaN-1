// services/tickets.service.js
import ticketsRepository from "../repositories/tickets.repository.js"
import { cartsManager } from "../managers/carts.manager.js"
import { productsManager } from "../managers/products.manager.js"

class TicketsService {
    // Generar código único
    generateTicketCode() {
        return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    }

    // Procesar compra
    async processPurchase(cartId, userEmail) {
        //Obtener carrito
        const cart = await cartsManager.getCartById(cartId)
        if (!cart) {
            return { success: false, message: "Carrito no encontrado" }
        }

        if (!cart.products || cart.products.length === 0) {
            return { success: false, message: "Carrito vacío" }
        }

        const productosComprados = []
        const productosNoComprados = []
        let totalAmount = 0

        //Procesar cada producto
        for (const item of cart.products) {
            const productId = item.product._id || item.product
            const product = await productsManager.findById(productId)

            if (!product.success) {
                productosNoComprados.push(productId)
                continue
            }

            // Verificar stock
            if (product.data.stock >= item.cantidad) {
                // HAY STOCK: descontar y agregar a comprados
                const newStock = product.data.stock - item.cantidad
                await productsManager.updateOne(productId, {
                    stock: newStock,
                    disponible: newStock > 0,
                })

                productosComprados.push({
                    product: productId,
                    quantity: item.cantidad,
                    price: product.data.price,
                })

                totalAmount += product.data.price * item.cantidad
            } else {
                // NO HAY STOCK: agregar a no comprados
                productosNoComprados.push(productId)
            }
        }

        //  Si no compró nada
        if (productosComprados.length === 0) {
            return {
                success: false,
                message: "No hay productos con stock disponible",
                productosNoComprados,
            }
        }

        //Crear ticket
        const ticketData = {
            code: this.generateTicketCode(),
            amount: totalAmount,
            comprador: userEmail,
            products: productosComprados,
        }

        const ticket = await ticketsRepository.createOne(ticketData)

        //Actualizar carrito (dejar solo productos sin stock)
        const productosRestantes = cart.products.filter((item) => {
            const productId = (item.product._id || item.product).toString()
            return productosNoComprados.some(
                (id) => id.toString() === productId
            )
        })

        await cartsManager.updateCartProducts(cartId, productosRestantes)

        //Retornar resultado
        return {
            success: true,
            ticket: ticket.data,
            productosNoComprados,
        }
    }
}

export const ticketsService = new TicketsService()
