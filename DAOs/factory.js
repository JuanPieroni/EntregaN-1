import config from "../config/env.config.js"
import MongoUsersDatabase from "./database/mongo/users.mongo.js"
import MongoProductsDatabase from "./database/mongo/products.mongo.js"
import MongoCartsDatabase from "./database/mongo/carts.mongo.js"

class DatabaseFactory {
    static getDatabase(type) {
        const database = config.database || 'mongo-local'
        
        switch (database) {
            case 'mongo-atlas':
            case 'mongo-local':
                return this._getMongoDB(type)
            case 'mysql':
                return this._getMySQLDB(type)
            default:
                return this._getMongoDB(type)
        }
    }

    static _getMongoDB(type) {
        switch (type) {
            case 'users':
                return new MongoUsersDatabase()
            case 'products':
                return new MongoProductsDatabase()
            case 'carts':
                return new MongoCartsDatabase()
            default:
                throw new Error(`Tipo de base de datos no soportado: ${type}`)
        }
    }

    static _getMySQLDB(type) {
        //Todo : agregar mySql , lo dejo solo para implementar factory
        throw new Error('MySQL no implementado aún')
    }
}

export default DatabaseFactory
