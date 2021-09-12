/**
 * Helper responsável por manipular o mongodb
 */

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

// Dados MongoDB para desenvolvimento.
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// Dados Mongodb para avaliação.
//const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
//const DB_NAME = 'Cookmaster';

class MongoDB {
    /**
     * Construtor para o helper.
     *
     * @param String collection - Nome da coleção.
     */
    constructor(collection) {
        this.collection = collection;
    }

    static getQueryByID(id) {
        return {
            _id: new ObjectId(id),
        };
    }

    /**
     * Insere um registro no mongodb.
     *
     * @param {Object} data - Dados inseridos
     * @returns Object
     */
    async insert(data) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let insertedOb = '';
        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            const result = await collection.insertOne(data);
            insertedOb = await this.getByID(result.insertedId);
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
        }

        return insertedOb;
    }

    /**
     * Atualiza um registro no mongodb.
     *
     * @param {Object} data - Dados atualizados
     * @returns Object
     */
    async update(data, id) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let updatedOb = '';
        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            const setValues = {
                $set: data,
            };

            const query = MongoDB.getQueryByID(id);
            await collection.updateOne(query, setValues);
            updatedOb = await this.getByID(id);
        } catch (error) {
            console.log(error);

        } finally {
            await client.close();
        }

        return updatedOb;
    }

    /**
     * Retorna uma lista de objetos a partir de uma query.
     *
     * @param {Object} data - Query para a busca no formato mongodb.
     * @returns Array
     */
    async list(query) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';
        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            result = await collection.find(query).toArray();
        } catch (error) {
            console.log(error);
        } finally {
            await client.close();
        }

        return result;
    }

    /**
     * Retorna um objeto a partir de uma query usando o id.
     *
     * @param {Object} data - Query para a busca por id formato mongodb.
     * @returns Object
     */
    async getByID(id) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';

        if (!id) return result;
        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            const formatedQuery = MongoDB.getQueryByID(id);
            result = await collection.findOne(formatedQuery);
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

        return result;
    }

    /**
     * Retorna um objeto a partir de uma query.
     *
     * @param {Object} data - Query para a busca por id formato mongodb.
     * @returns Object
     */
    async getByQuery(query) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';

        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            result = await collection.findOne(query);
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

        return result;
    }

    /**
     * Retorna a contagem a partir de uma determinada query.
     *
     * @param {Object} data - Query para a busca no formato mongodb.
     * @returns Int
     */
    async count(query) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';

        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            result = await collection.countDocuments(query);
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

        return result;
    }

    /**
     * Remove um objeto a partir de uma query por id.
     *
     * @param {Object} data - Query para a busca por id formato mongodb.
     * @returns Object
     */
    async remove(id) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';

        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            const formatedQuery = MongoDB.getQueryByID(id);
            result = await collection.deleteOne(formatedQuery);
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

        return result;
    }
}

module.exports = MongoDB;