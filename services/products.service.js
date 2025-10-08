import { productsManager } from "../managers/products.manager.js"


class ProductsService {
    async getAllProducts(filters) {
        return await productsManager.findAllProducts(filters)
    }

    async getProductById(id) {
        return await productsManager.findById(id)
    }

    async createProduct(productData) {
        return await productsManager.createOne(productData)
    }

    async updateProduct(id, productData) {
        return await productsManager.updateOne(id, productData)
    }

    async deleteProduct(id) {
        return await productsManager.deleteOne(id)
    }
}

export const productsService = new ProductsService()
