import mongoose from "mongoose"
import config from "../env.config.js"

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(
            config.mongodb.local,
            console.log("MongoDB conectado a Mongo Compass 127.0.0.1:27017")
        )
    } catch (error) {
        console.error("Error al conectar a mongoDB")
        process.exit(1)
    }
}

export const connectToMongoDBAtlas = async () => {
    try {
        await mongoose.connect(
 
           config.mongodb.atlas,
            console.log("MongoDB conectado a Atlas")
        )
    } catch (error) {
        console.error("Error al conectar a Mongo Atlas")
        process.exit(1)
    }
}
