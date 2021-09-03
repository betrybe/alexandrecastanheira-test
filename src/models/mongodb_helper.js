const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

module.exports = {
    insert(collection, data) {
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
    },
    update(collection, data, query) {
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
    },
    list(collection, query) {
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
    },
    get(collection, query) {
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
    },
};