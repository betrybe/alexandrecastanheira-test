/**
 * Helper responsável por manipular o mongodb
 */
import { MongoClient } from 'mongodb';

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

export function insert(collection, data) {
    console.log('inserindo no mongodb');
    MongoClient.connect(MONGO_DB_URL, (err, db) => {
        if (err) throw err;
        const dbo = db.db(DB_NAME);
        dbo.collection(collection).insertOne(data, (error, res) => {
            if (error) throw error;
            console.log('1 document inserted');
            db.close();
        });
    });
}
export function update(collection, data, query) {
    console.log('Atualizando no mongodb');
    MongoClient.connect(MONGO_DB_URL, (err, db) => {
        if (err) throw err;
        const dbo = db.db(DB_NAME);

        dbo.collection(collection).updateOne(query, data, (error, res) => {
            if (error) throw error;
            console.log('1 document updated');
            db.close();
        });
    });
}
export function list(collection, query) {
    console.log('Listando no mongodb');
    MongoClient.connect(MONGO_DB_URL, (err, db) => {
        if (err) throw err;
        const dbo = db.db(DB_NAME);
        dbo.collection(collection).find(query).toArray((error, res) => {
            if (error) throw error;
            console.log(res);
            db.close();
        });
    });
}
export function get(collection, query) {
    console.log('Realizando get no mongodb');
    MongoClient.connect(MONGO_DB_URL, (err, db) => {
        if (err) throw err;
        const dbo = db.db(DB_NAME);
        dbo.collection(collection).findOne(query, (error, res) => {
            if (error) throw error;
            console.log(res.name);
            db.close();
        });
    });
}

export function remove(collection, query) {
    console.log('Realizando delete no mongodb');
    MongoClient.connect(MONGO_DB_URL, (err, db) => {
        if (err) throw err;
        const dbo = db.db(DB_NAME);
        dbo.collection(collection).deleteOne(query, (error, res) => {
            if (error) throw error;
            console.log('1 document deleted');
            db.close();
        });
    });
}