import { Router } from "express"

const router = Router()

router.post("/", (req, res) => {
    res.status(201).json({ mensaje: `El carrito fue creado con exito` })
})

router.get("/", (req, res) => {
    res.status(200).json({ title: "Api carts", carritos }) // Si no hay carritos, devuelve []
})

router.get("/:cid", (req, res) => {
    res.status(404).json({ mensajes: "Carrito no encontrado" })
    res.status(200).json(carrito.productos)
})

router.post("/:cid/product/:pid", (req, res) => {})
return router
