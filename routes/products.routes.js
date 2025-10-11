import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/products.controller.js"
import CustomRouter from "../utils/CustomRouter.js"
import { handlePolicies } from "../middlewares/handlePolicies.js"


const productsRouter = new CustomRouter()

productsRouter.get("/", getAllProducts)

productsRouter.get("/:pid", getProductById)

productsRouter.post("/", handlePolicies(["ADMIN"]), createProduct)

productsRouter.put("/:pid", handlePolicies(["ADMIN"]), updateProduct)

productsRouter.delete("/:pid", handlePolicies(["ADMIN"]), deleteProduct)

export default productsRouter.getRouter()
