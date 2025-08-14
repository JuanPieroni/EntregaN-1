import { Router } from "express"
import { aggregateCarrito } from "../controllers/aggregation.controller.js"

const router = Router()

router.get("/:cid/detalle", aggregateCarrito)
