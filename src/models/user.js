/**
 * Model responsável por requisições CRUD
 */
const MongoDB = require('../helpers/mongodb_helper');
const Model = require('./model');

const fields = [
    {
        fieldName: 'name',
        fieldType: 'str',
        isRequired: true,
        validateFunctions: [],
    },
    {
        fieldName: 'email',
        fieldType: 'str',
        isRequired: true,
        validateFunctions: [
            'emailValid',
            'unique',
        ],
    },
    {
        fieldName: 'password',
        fieldType: 'str',
        isRequired: true,
        validateFunctions: [],
    },
    {
        fieldName: 'role',
        fieldType: 'str',
        isRequired: false,
        validateFunctions: [],
    },
];

class User extends Model {
    constructor() {
        super();
        this.entityName = 'users';
        this.setDatabase(new MongoDB(this.entityName));
        this.fields = fields;
    }
}

module.exports = User;