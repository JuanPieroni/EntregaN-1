import { Router } from "express"
import { productsManager } from "../managers/ProductsManager"

const router = Router()

router.get("/", async (req, res) => {
    const productos = await productsManager.findAllProducts(req.query)
    res.json({ productos })
})

router.get("/:pid", (req, res) => {})

router.post("/", (req, res) => {})

router.put("/:pid", (req, res) => {})

router.delete("/:pid", (req, res) => {})

export default router
