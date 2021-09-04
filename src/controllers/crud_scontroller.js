/**
 * Controller responsável por requisições CRUD
 */
// caso o banco mude, apenas o require vai ser alterado
class CrudController {
    constructor(model, database) {
        this.model = model;
        this.database = database;
    }

    insert(values) {
        console.log(`Realizando insert no mongodb da entidade: ${this.model.entityName}`);
        // this.database.insert(this.model.entityName, values);
    }

    update(values, query) {
        console.log(`Realizando update no mongodb da entidade: ${this.model.entityName}`);
        // this.database.update(this.model.entityName, values, query);
    }

    list(query) {
        console.log(`Realizando list no mongodb da entidade: ${this.model.entityName}`);
        // this.database.list(this.model.entityName, query);
    }

    get(query) {
        console.log(`Realizando get no mongodb da entidade: ${this.model.entityName}`);
        // this.database.get(this.model.entityName, query);
    }

    remove(query) {
        console.log(`Realizando get no mongodb da entidade: ${this.model.entityName}`);
        // this.database.remove(this.model.entityName, query);
    }
}

module.exports = CrudController;