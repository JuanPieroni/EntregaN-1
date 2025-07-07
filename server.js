const express = require("express")
const app = express()
const PORT = 8080

app.get("/api/productos", (req, res) => {})

app.get("/api/products/:pid", (req, res) => {})

app.post("/api/products", (req, res) => {})
app.put("/api/products/:pid", (req, res) => {})
app.delete("/api/products/:pid", (req, res) => {})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
