import mongoose from "mongoose"
import config from "../env.config.js"

class MongoSingleton {
    static instance

    constructor() {
        this.connection = null
    }

    async connect(useAtlas) {
        if (!MongoSingleton.instance) {
            const url = useAtlas ? config.mongodb.atlas : config.mongodb.local
            this.connection = await mongoose.connect(url, {})
            console.log(
                useAtlas
                    ? "MongoDB conectado a Atlas"
                    : "MongoDB conectado a Mongo Compass 127.0.0.1:27017"
            )

            MongoSingleton.instance = this
        }
        return MongoSingleton.instance
    }
}

export default MongoSingleton

/* export const connectToMongoDB = async () => {
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
 */
