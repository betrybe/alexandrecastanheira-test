/**
 * Model responsável por requisições CRUD
 */
const MongoDB = require('../../helpers/mongodb_helper');
const Model = require('./model');

class User extends Model {
    constructor() {
        super();
        this.entityName = 'users';
        this.entitySingular = 'user';
        this.setDatabase(new MongoDB(this.entityName));
    }

    /**
     * Sobrescrita para remover a senha do retorno.
     */
    async insert(values) {
        const insertedOb = await super.insert(values);
        if (insertedOb) {
            delete insertedOb.password;
        }
        return insertedOb;
    }

    /**
     * Sobrescrita para remover a senha do retorno.
     */
    async update(values, id) {
        const updatedOb = await super.update(values, id);
        delete updatedOb.password;
        return updatedOb;
    }
}

module.exports = User;