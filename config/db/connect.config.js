import mongoose from "mongoose"
import config from "../env.config.js"

class MongoSingleton {
    static instance

    constructor() {
        this.connection = null
    }

    async connect() {
        if (!MongoSingleton.instance) {
            this.connection = await mongoose.connect(config.mongodb.atlas, {})
            console.log("MongoDB conectado a Atlas")

            MongoSingleton.instance = this
        }
        return MongoSingleton.instance
    }
}

export default MongoSingleton
