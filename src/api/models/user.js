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

    /**
     * Sobrescrita para remover a senha do retorno.
     */
    async insert(values) {
        const insertedOb = await super.insert(values);
        delete insertedOb.password;
        return insertedOb;
    }

    /**
     * Sobrescrita para remover a senha do retorno.
     */
    async update(values, query) {
        const updatedOb = await super.update(values, query);
        delete updatedOb.password;
        return updatedOb;
    }
}

module.exports = User;