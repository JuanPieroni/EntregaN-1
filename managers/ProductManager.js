import BaseManager from "./BaseManager.js"
import { productsModel } from "../models/product.model.js"

class ProductManager extends BaseManager {
    constructor() {
        super(productsModel)
    }

    async findAllProducts(obj) {
        console.log(obj)
        const { limit, page, sort, ...restoQueryFilter } = obj
        console.log("restoQueryFilter", restoQueryFilter)
        const response = await productsModel.paginate(restoQueryFilter, {
            limit,
            page,
           
        })
    }
}

export const productsManager = new ProductManager()
