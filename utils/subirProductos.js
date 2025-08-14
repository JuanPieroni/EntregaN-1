// seedProducts.js
import fs from "fs";
import mongoose from "mongoose";
import { productsModel } from "../models/product.model.js";  
 
await mongoose.connect("mongodb+srv://SeisDuro:Atlgla36%2A@cluster0.bvo0gcz.mongodb.net/entregaFinal?retryWrites=true&w=majority");
console.log("Conectado a MongoDB");

 
const productos = JSON.parse(fs.readFileSync("productos.json", "utf-8"));

 
await productsModel.insertMany(productos);
console.log("Productos insertados en MongoDB");

 
await mongoose.connection.close();
console.log("Conexión cerrada"); 
