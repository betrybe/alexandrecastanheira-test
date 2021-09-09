/**
 * Model responsável por requisições CRUD
 */

class Model {
    constructor() {
        this.database = false;
        this.entityName = '';
    }

    setDatabase(database) {
        this.database = database;
    }

    async insert(values) {
        return this.database.insert(values);
    }

    async update(values, query) {
        return this.database.update(values, query);
    }

    async list(query) {
        return this.database.list(query);
    }

    async count(query) {
        return this.database.count(query);
    }

    async get(query) {
        return this.database.getByID(query);
    }

    async getByQuery(query) {
        return this.database.getByQuery(query);
    }

    async remove(query) {
        return this.database.remove(query);
    }
}

module.exports = Model;