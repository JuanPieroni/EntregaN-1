import {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    updateProductInCart,
    removeProductFromCart,
    clearCart,
    addProductToCart,
} from "../controllers/carts.controller.js"
import { getCartDetails } from "../controllers/aggregation.controller.js"
import { purchaseCart } from "../controllers/ticket.controller.js"
import CustomRouter from "../utils/CustomRouter.js"
import { handlePolicies } from "../middlewares/handlePolicies.js"

const cartsRouter = new CustomRouter()

cartsRouter.get("/", getAllCarts)
cartsRouter.get("/:cid", getCartById)
cartsRouter.post("/", createCart)
cartsRouter.get("/:cid/detalle", getCartDetails)

cartsRouter.put(
    "/:cid/product/:pid",
    handlePolicies(["USER", "ADMIN"]),
    updateProductInCart
)
cartsRouter.delete(
    "/:cid/product/:pid",
    handlePolicies(["USER", "ADMIN"]),
    removeProductFromCart
)
cartsRouter.delete("/:cid", handlePolicies(["USER", "ADMIN"]), clearCart)
cartsRouter.post(
    "/:cid/product/:pid",
    handlePolicies(["USER", "ADMIN"]),
    addProductToCart
)
cartsRouter.put("/:cid", handlePolicies(["USER", "ADMIN"]), updateCart)
cartsRouter.post(
    "/:cid/purchase",
    handlePolicies(["USER", "ADMIN"]),
    purchaseCart
)

export default cartsRouter.getRouter()
