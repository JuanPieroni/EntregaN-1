import { Router } from "express"
import { User } from "../config/models/User.model.js"
import mongoose from "mongoose"
const router = Router()

//obtener los usuarios
router.get("/", async (req, res) => {
    const users = await User.find()
    res.json(users)
})

router.post("/", async (req, res) => {
    try {
        const { name, email, age } = req.body
        const user = new User({ name, email, age })
        await user.save()
        res.status(201).json({ message: "Usuario creado correctamente", user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// buscar usuario por ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Id no válido" })
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        }
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//actualizar usuario por ID
router.put("/:id", async (req, res) => {
    try {
        //"si no viene con formato correcto...."
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Id no válido" })
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!user)
            return res.status(404).json({ error: "Usuario no encontrado" })
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
// eliminar usuario por ID
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Id no válido" })
        }
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        }
        res.json({ message: "Usuario eliminado correctamente" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
export default router
