import mongoose from "mongoose"
import config from "../env.config.js"

class MongoSingleton {
    static instance

    constructor() {
        this.connection = null
    }

    async connect() {
        if (!MongoSingleton.instance) {
            const Db = config.database || "mongo"

            if (Db.includes("mongo")) {
                const url =
                    Db === "mongo-atlas"
                        ? config.mongodb.atlas
                        : config.mongodb.local

                this.connection = await mongoose.connect(url, {})

                console.log(
                    Db === "mongo-atlas"
                        ? "✅ MongoDB conectado a Atlas"
                        : "✅ MongoDB conectado a Local (127.0.0.1:27017)"
                )
            }

            MongoSingleton.instance = this
        }
        return MongoSingleton.instance
    }
}
export default MongoSingleton
