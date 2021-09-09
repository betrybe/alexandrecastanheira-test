/**
 * Model responsável por requisições CRUD
 */
 const MongoDB = require('../../helpers/mongodb_helper');
 const Model = require('./model');

const fields = [
    {
        fieldName: 'name',
        fieldType: 'str',
        isRequired: true,
        validateFunctions: [],
    },
    {
        fieldName: 'ingredients',
        fieldType: 'str',
        isRequired: true,
        validateFunctions: [],
    },
    {
        fieldName: 'preparation',
        fieldType: 'str',
        isRequired: true,
        validateFunctions: [],
    },
    {
        fieldName: 'userId',
        fieldType: 'str',
        //isRequired: true,
        validateFunctions: [],
    },
]

class Recipe extends Model {
    constructor() {
        super();
        this.entityName = 'recipes';
        this.setDatabase(new MongoDB(this.entityName));
        this.fields = fields;
    }
}

 module.exports = Recipe;