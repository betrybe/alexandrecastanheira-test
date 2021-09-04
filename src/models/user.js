/**
 * Model responsável por requisições CRUD
 */
// caso o banco mude, apenas o require vai ser alterado
const model = require('./schemas/user_schema');
const database = require('../helpers/mongodb_helper');

export function getSchema() {
    return model;
}

export function insert(values) {
    console.log(`Realizando insert no mongodb da entidade: ${model.entityConfig.entityName}`);
    database.insert(model.entityConfig.entityName, values);
}
export function update(values, query) {
    console.log(`Realizando update no mongodb da entidade: ${model.entityConfig.entityName}`);
    database.update(model.entityConfig.entityName, values, query);
}
export function list(query) {
    console.log(`Realizando list no mongodb da entidade: ${model.entityConfig.entityName}`);
    database.list(model.entityConfig.entityName, query);
}
export function get(query) {
    console.log(`Realizando get no mongodb da entidade: ${model.entityConfig.entityName}`);
    database.get(model.entityConfig.entityName, query);
}

export function remove(query) {
    console.log(`Realizando get no mongodb da entidade: ${model.entityConfig.entityName}`);
    database.remove(model.entityConfig.entityName, query);
}