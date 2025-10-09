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
import CustomRouter from "../utils/CustomRouter.js"

const cartsRouter = new CustomRouter()

cartsRouter.get("/", getAllCarts)
cartsRouter.get("/:cid", getCartById)
cartsRouter.post("/", createCart)
cartsRouter.put("/:cid", updateCart)
cartsRouter.put("/:cid/product/:pid", updateProductInCart)
cartsRouter.delete("/:cid/product/:pid", removeProductFromCart)
cartsRouter.delete("/:cid", clearCart)
cartsRouter.post("/:cid/product/:pid", addProductToCart)
cartsRouter.get("/:cid/detalle", getCartDetails)


export default cartsRouter.getRouter()

