import mongoose from "mongoose"

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/coderhouse",
            console.log("MongoDB conectado a 127.0.0.1:27017")
        )
    } catch (error) {
        console.error("Error al conectar a mongoDB")
        process.exit(1)
    }
}

export const connectToMongoDBAtlas = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://SeisDuro:Atlgla36%2A@cluster0.bvo0gcz.mongodb.net/ecommerce?retryWrites=true&w=majority",
            console.log("MongoDB conectado a Atlas")
        )
    } catch (error) {
        console.error("Error al conectar a mongoAtlas")
        process.exit(1)
    }
}
