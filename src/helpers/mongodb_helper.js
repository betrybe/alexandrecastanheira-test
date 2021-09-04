/**
 * Helper responsável por manipular o mongodb
 */
// import { MongoClient } from 'mongodb';
const mongo = require('mongodb');

const { MongoClient } = mongo;

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

class MongoDB {
    construct(collection) {
        this.collection = collection;
    }

    insert(data) {
        console.log('inserindo no mongodb');
        MongoClient.connect(MONGO_DB_URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(DB_NAME);
            dbo.collection(this.collection).insertOne(data, (error, _res) => {
                if (error) throw error;
                console.log('1 document inserted');
                db.close();
            });
        });
    };

    update(data, query) {
        console.log('Atualizando no mongodb');
        MongoClient.connect(MONGO_DB_URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(DB_NAME);

            dbo.collection(this.collection).updateOne(query, data, (error, _res) => {
                if (error) throw error;
                console.log('1 document updated');
                db.close();
            });
        });
    };

    list(query) {
        console.log('Listando no mongodb');
        MongoClient.connect(MONGO_DB_URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(DB_NAME);
            dbo.collection(this.collection).find(query).toArray((error, res) => {
                if (error) throw error;
                console.log(res);
                db.close();
            });
        });
    };

    get(query) {
        console.log('Realizando get no mongodb');
        MongoClient.connect(MONGO_DB_URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(DB_NAME);
            dbo.collection(this.collection).findOne(query, (error, res) => {
                if (error) throw error;
                console.log(res.name);
                db.close();
            });
        });
    };

    remove(query) {
        console.log('Realizando delete no mongodb');
        MongoClient.connect(MONGO_DB_URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(DB_NAME);
            dbo.collection(this.collection).deleteOne(query, (error, _res) => {
                if (error) throw error;
                console.log('1 document deleted');
                db.close();
            });
        });
    };
}

module.exports = MongoDB;