import BaseManager from "./BaseManager.js"
import { productsModel } from "../models/products.model.js"
import { resolvePtr } from "dns/promises"

class ProductsManager extends BaseManager {
    constructor() {
        super(productsModel)
    }

    async findAllProducts(obj) {
        const { limit, page, sort, ...restoQueryFilter } = obj
    }
}

export const productsManager = new ProductsManager()
