import { productsService } from "../services/products.service.js"
import { cartsService } from "../services/carts.service.js"
import { ticketsService } from "../services/tickets.service.js"

export const renderProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts(req.query)

        // Pasar carrito del usuario autenticado
        res.render("index", {
            products,
            userCartId: req.user.cart,
            user: req.user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener productos")
    }
}

export const renderCart = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartsService.getCartById(cid)

        if (!cart) {
            return res.status(404).send("Carrito no encontrado")
        }

        res.render("cart", { cart })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al cargar el carrito")
    }
}

export const renderCarts = async (req, res) => {
    try {
        const carts = await cartsService.getAllCarts()
        res.render("carts", { carts })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener carritos")
    }
}

export const renderLogin = (req, res) => {
    res.render("login")
}

export const renderRegister = (req, res) => {
    res.render("register")
}

export const renderProfile = (req, res) => {
    console.log("req.user en /profile:", req.user)
    res.render("profile", { user: req.user })
}

export const renderCompraSuccess = async (req, res) => {
    try {
        const { cid } = req.params
        const userEmail = req.user.email
        const result = await ticketsService.processPurchase(cid, userEmail)

        if (!result.success) {
            const cart = await cartsService.getCartById(cid)
            return res.render("cart", {
                cart,
                error: true,
                errorMessage: result.message,
            })
        }

        res.render("compra-exitosa", {
            ticket: result.ticket,
            productosNoComprados: result.productosNoComprados,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al procesar la compra")
    }
}
