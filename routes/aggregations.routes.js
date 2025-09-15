import { Router } from "express"
import { aggregateCarrito } from "../controllers/aggregation.controller.js"

const aggregationRouter = Router()

aggregationRouter.get("/:cid/detalle", aggregateCarrito)

export default aggregationRouter
