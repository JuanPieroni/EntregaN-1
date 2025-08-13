import BaseManager from "./BaseManager.js"
import { productsModel } from "../models/product.model.js"

class ProductManager extends BaseManager {
    constructor() {
        super(productsModel)
    }

    async findAllProducts(params) {
        console.log(params)
        const { limit, page, sort, ...restoQueryFilters } = params

        console.log("restoQueryFilters", restoQueryFilters)
// metersoryt aca
        const response = await productsModel.paginate(restoQueryFilters, {
            limit,
            page,
        })

        return response
    }
}

export const productsManager = new ProductManager()
