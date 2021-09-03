const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

//const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

module.exports = {
    insert() {
      console.log('inserindo no mongodb');
    },
    update() {
        console.log('Atualizando no mongodb');
    },
    list() {
        console.log('Listando no mongodb');
    },
    get() {
        console.log('Realizando get no mongodb');
    }
};