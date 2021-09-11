/**
 * Model responsável por requisições CRUD
 */

class Model {
    constructor() {
        this.database = false;
        this.entityName = '';
        this.entitySingular = '';
    }

    getEntityName() {
        return this.entityName;
    }

    setDatabase(database) {
        this.database = database;
    }

    async insert(values) {
        return this.database.insert(values);
    }

    async update(values, id) {
        return this.database.update(values, id);
    }

    async list(query) {
        return this.database.list(query);
    }

    async count(query) {
        return this.database.count(query);
    }

    async get(id) {
        console.log('veio no get da model.');
        return this.database.getByID(id);
    }

    async getByQuery(query) {
        return this.database.getByQuery(query);
    }

    async remove(id) {
        return this.database.remove(id);
    }
}

module.exports = Model;