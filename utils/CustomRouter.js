import { Router } from "express"

export default class CustomRouter {
    constructor() {
        this.router = Router()
    }

    get(path, ...callbacks) {
        this.router.get(path, this.addCustomResponses, ...callbacks)
        return this
    }

    post(path, ...callbacks) {
        this.router.post(path, this.addCustomResponses, ...callbacks)
        return this
    }

    put(path, ...callbacks) {
        this.router.put(path, this.addCustomResponses, ...callbacks)
        return this
    }

    delete(path, ...callbacks) {
        this.router.delete(path, this.addCustomResponses, ...callbacks)
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

    getRouter() {
        return this.router
    }
}
