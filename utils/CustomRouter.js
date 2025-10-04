import { Router } from "express"

export default class CustomRouter {
    constructor() {
        this.router = Router()
        this.init()
    }
    getRouter() {
        return this.router
    }

    init() {}

    get(path, ...callbacks) {
        this.router.get(
            path,
            this.addCustomResponses,
            ...this.applyCallbacks(callbacks)
        )
        return this
    }

    post(path, ...callbacks) {
        this.router.post(
            path,
            this.addCustomResponses,
            ...this.applyCallbacks(callbacks)
        )
        return this
    }

    put(path, ...callbacks) {
        this.router.put(
            path,
            this.addCustomResponses,
            ...this.applyCallbacks(callbacks)
        )
        return this
    }

    delete(path, ...callbacks) {
        this.router.delete(
            path,
            this.addCustomResponses,
            ...this.applyCallbacks(callbacks)
        )
        return this
    }

    // Middleware que agrega métodos personalizados al res
    addCustomResponses(req, res, next) {
        // 🎯 RESPUESTAS API JSON
        res.sendSuccess = (payload, message = "Success") => {
            res.status(200).json({
                status: "success",
                message,
                payload,
            })
        }

        res.sendCreated = (payload, message = "Created") => {
            res.status(201).json({
                status: "success",
                message,
                payload,
            })
        }

        res.sendError = (message = "Error", statusCode = 400) => {
            res.status(statusCode).json({
                status: "error",
                message,
                payload: null,
            })
        }

        res.sendServerError = (message = "Internal Server Error") => {
            res.status(500).json({
                status: "error",
                message,
                payload: null,
            })
        }

        res.sendNotFound = (message = "Not Found") => {
            res.status(404).json({
                status: "error",
                message,
                payload: null,
            })
        }

        res.sendUnauthorized = (message = "Unauthorized") => {
            res.status(401).json({
                status: "error",
                message,
                payload: null,
            })
        }

        res.sendForbidden = (message = "Forbidden") => {
            res.status(403).json({
                status: "error",
                message,
                payload: null,
            })
        }

        // 🎨 RESPUESTAS VISTAS (RENDER)
        res.renderError = (view, errorMessage = "Error occurred") => {
            res.render(view, {
                error: true,
                errorMessage,
                title: "Error",
            })
        }

        res.renderSuccess = (view, data = {}, successMessage = "Success") => {
            res.render(view, {
                ...data,
                success: true,
                successMessage,
                error: false,
            })
        }

        next()
    }
    //Todo : Regex y expresiones para validar params y body
    //Todo ver como reemplazar los try catch de todas las rutas , over para que carajo mas sirve este custom router
    //Todo usar applycallbacks para reemplazar los try catch de todas las rutas
    //Todo despues de hacer eso, como concha especifico cada error? o sea, si es 400, 500, 401, 403, y no generalizado

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.error("Error en ruta:", error)
                const res = params[1]
                res.status(500).send({ status: "error", error: "Server error" })
            }
        })
    }

    //Todo hacer el mapeo de rutas en un método init() que se llame en el constructor
}
