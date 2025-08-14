import mongoose from "mongoose"
import { cartsModel } from "../models/carts.model.js"

export const getDetalleCarrito = async (req, res) => {
    try {
        const { cid } = req.params
        const carritoId = new mongoose.Types.ObjectId(cid)

        const detalle = await cartsModel.aggregate([
            { $match: { _id: carritoId } },
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "products",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "productoDetalle"
                }
            },
         
        ])

        res.status(200).json({ status: "success", payload: detalle })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message })
    }
}
