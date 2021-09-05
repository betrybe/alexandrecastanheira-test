/**
 * Controller responsável por requisições CRUD
 */
// caso o banco mude, apenas o require vai ser alterado
class CrudController {
    constructor(model) {
        this.model = model;
    }

    async insert(values) {
        console.log(`Realizando insert no mongodb da entidade: ${this.model.entityName}`);
        return this.model.insert(values);
    }

    async update(values, query) {
        console.log(`Realizando update no mongodb da entidade: ${this.model.entityName}`);
        return this.model.update(values, query);
    }

    async list(query) {
        console.log(`Realizando list no mongodb da entidade: ${this.model.entityName}`);
        return this.model.list(query);
    }

    async get(query) {
        console.log(`Realizando get no mongodb da entidade: ${this.model.entityName}`);
        return this.model.get(query);
    }

    async remove(query) {
        console.log(`Realizando get no mongodb da entidade: ${this.model.entityName}`);
        return this.model.remove(query);
    }
}

module.exports = CrudController;