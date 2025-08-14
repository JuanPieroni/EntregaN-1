import BaseManager from "./base.manager.js"
import { productsModel } from "../models/product.model.js"

class ProductManager extends BaseManager {
    constructor() {
        super(productsModel)
    }

    async findAllProducts(params) {
        console.log(params)
        const { limit = 10, page = 1, sort, ...restoQueryFilters } = params

        console.log("restoQueryFilters", restoQueryFilters)

        const sortFilter = sort ? { price: sort === "asc" ? 1 : -1 } : {}
        const response = await productsModel.paginate(restoQueryFilters, {
            limit,
            page,
            sort: sortFilter,
            lean: true,
        })

        return {
            status: "success",
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
        }
    }
}

export const productsManager = new ProductManager()
