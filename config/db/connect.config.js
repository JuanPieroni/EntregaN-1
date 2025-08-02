import mongoose from "mongoose"

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/users",
            console.log("MongoDB conectado")
        )
    } catch (error) {
        console.error("Error al conectar a mongoDB")
        process.exit(1)
    }
}
