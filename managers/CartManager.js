import BaseManager from "./BaseManager.js"
import { cartsModel } from "../models/carts.model.js"

class CartsManager extends BaseManager {
    constructor() {
        super(cartsModel)
    }
}

export const cartsManager = new CartsManager()
