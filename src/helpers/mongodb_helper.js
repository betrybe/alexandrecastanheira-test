/**
 * Helper responsável por manipular o mongodb
 */
// import { MongoClient } from 'mongodb';
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

class MongoDB {
    constructor(collection) {
        this.collection = collection;
    }

    async insert(data) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            // create a document to be inserted

            const result = await collection.insertOne(data);
            console.log(
                `${result.insertedCount} documento inserido com o _id: ${result.insertedId}`,
            );
        } finally {
            await client.close();
        }
    }

    async update(data, query) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';
        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            const setValues = {
                $set: data,
            };

            const query2 = {
                _id: new ObjectId(query.id),
            };

            result = await collection.updateOne(query2, setValues);
        } finally {
            await client.close();
        }

        return result;
    }

    async count(query) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';
        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            result = await collection.countDocuments(query);
        } finally {
            await client.close();
        }

        return result;
    }

    async list(query) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';
        try {
            await client.connect();
            const database = client.db(DB_NAME);
            const collection = database.collection(this.collection);
            result = await collection.find(query).toArray();
        } finally {
            await client.close();
        }

        return result;
    }

    async get(query) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';

        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(this.collection);
        const query2 = {
            _id: new ObjectId(query.id),
        };
        result = await collection.findOne(query2);

        client.close();
        console.log('result');
        console.log(result);

        return result;
    }

    async remove(query) {
        const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
        let result = '';

        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(this.collection);
        const query2 = {
            _id: new ObjectId(query.id),
        };
        result = await collection.deleteOne(query2);

        client.close();
        console.log('result');
        console.log(result);

        return result;
    }
}

module.exports = MongoDB;