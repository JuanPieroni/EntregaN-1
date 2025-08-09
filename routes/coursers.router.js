import { Router } from "express"
import { Curso } from "../config/models/Curso.model.js"
import mongoose from "mongoose"
import { User } from "../config/models/User.model.js"
const router = Router()

//obtener los cursos
router.get("/", async (req, res) => {
    const cursos = await Curso.find()
    res.json(cursos)
})

router.post("/", async (req, res) => {
    try {
        const newCourse = await Curso.create(req.body)
        res.status(201).json(newCourse)
        //(Aca se podria validar q si el curso existe, no se cree uno.)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
//inscribir usuario a un curso
router.post("/:courserId/inscription/:studentId", async (req, res) => {
    try {
        const course = await Curso.findById(req.params.courserId)
        const student = await User.findById(req.params.studentId)
        if (!course || !student) {
            return res
                .status(404)
                .json({ error: "Curso o estudiante no encontrado" })
        }
        //chequear que no se haya inscripto
        if (course.students.includes(student._id)) {
            return res.status(400).json({
                error: `El estudiante ${student.name} ya está inscrito en el curso ${course.title}`,
            })
        }
        course.students.push(student._id)
        await course.save()
        res.status(202).json({
            message: `Alumno ${student.name} inscrito en el curso ${course.title}`,
        })
    } catch (error) {
        //error generico 500
        res.status(500).json({ error: error.message })
    }
})

router.delete("/:courserId/inscription/:studentId", async (req, res) => {
    try {
        const course = await Curso.findById(req.params.courserId)
        if (!course) {
            return res.status(404).json({ error: "Curso no encontrado" })
        }

        course.students = course.students.filter(
            (id) => id.toString() !== req.params.studentId
        )
        await course.save()
        res.status(202).json({
            message: `Estudiante con ID ${req.params.studentId} eliminado del curso ${course.title}`,
        })
    } catch (error) {
        //error generico 500
        res.status(500).json({ error: error.message })
    }
})

router.delete("/:courserId", async (req, res) => {
    try {
        const course = await Curso.findByIdAndDelete(req.params.courserId)
        if (!course) {
            return res.status(404).json({ error: "Curso no encontrado" })
        }
        //204 es un No content
        res.status(202).json({
            message: `Curso con ID ${req.params.courserId} eliminado`,
        })
    } catch (error) {
        //error generico 500

        res.status(500).json({ error: error.message })
    }
})
export default router
