import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/products.controller.js"
import CustomRouter from "../utils/CustomRouter.js"

const productsRouter = new CustomRouter()

productsRouter.get("/", getAllProducts)

productsRouter.get("/:pid", getProductById)

productsRouter.post("/", createProduct)

productsRouter.put("/:pid", updateProduct)

productsRouter.delete("/:pid", deleteProduct)

export default productsRouter.getRouter()
