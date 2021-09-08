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
        const msg = `Realizando insert da entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.insert(values);
    }

    async update(values, query) {
        const msg = `Realizando update na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.update(values, query);
    }

    async list(query) {
        const msg = `Realizando list na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.list(query);
    }

    async count(query) {
        const msg = `Realizando count na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.count(query);
    }

    async get(query) {
        const msg = `Realizando get na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.getByID(query);
    }

    async getByQuery(query) {
        const msg = `Realizando get na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.getByQuery(query);
    }

    async remove(query) {
        const msg = `Realizando delete na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.remove(query);
    }
}

module.exports = Model;