/**
 * Model responsável por requisições CRUD
 */
 const MongoDB = require('../../helpers/mongodb_helper');
 const Model = require('./model');

class Recipe extends Model {
    constructor() {
        super();
        this.entityName = 'recipes';
        this.entitySingular = 'recipe';
        this.setDatabase(new MongoDB(this.entityName));
    }
}

 module.exports = Recipe;