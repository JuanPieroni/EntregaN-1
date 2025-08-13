

class ProductManager {
    constructor(path) {
        this.path = path
    }
    async findAll ( ) {
        const result = await productsModel.paginate({},{})
    }
    async getProducts() {
        const response = await productsModel.find().lean()
        return response
    }

    async addProduct(producto) {
        const response = await productsModel.create(producto)
        return response
    }

    async getProductById(id) {
        const response = await productsModel.findById(id)
        return response
    }

    async deleteProduct(id) {
        const response = await productsModel.deleteOne({_id: id})
        return response
    }

    async updateProduct(id, data) {
        const response = await productsModel.updateOne({_id: id}, data)
        return response
    }
}

export default ProductManager
