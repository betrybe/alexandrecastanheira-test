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

    insert(values) {
        const msg = `Realizando insert da entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.insert(this.entityName, values);
    }

    update(values, query) {
        const msg = `Realizando update na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.update(this.entityName, values, query);
    }

    list(query) {
        const msg = `Realizando list na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.list(this.entityName, query);
    }

    get(query) {
        const msg = `Realizando get na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.get(this.entityName, query);
    }

    remove(query) {
        const msg = `Realizando delete na entidade: ${this.entityName}`;
        console.log(msg);
        return this.database.remove(this.entityName, query);
    }
}

module.exports = Model;