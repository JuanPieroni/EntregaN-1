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
            limit: response.limit,
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            sort : sortFilter,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            prevLink: response.hasPrevPage
                ? `/api/products?page=${response.prevPage}`
                : null,
            nextLink: response.hasNextPage
                ? `/api/products?page=${response.nextPage}`
                : null,
            
        }
    }
}

export const productsManager = new ProductManager()
