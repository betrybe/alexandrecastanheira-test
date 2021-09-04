/**
 * Mapeamento da entidade de usuários.
 */
const validate = require('../../api/services/validate_service');

exports.entityConfig = {
    entityName: 'users',
    fields: [
        {
            fieldName: 'name',
            fieldType: 'str',
            validateFunctions: [
                validate.REQUIRED,
            ],
        },
        {
            fieldName: 'email',
            fieldType: 'str',
            validateFunctions: [
                validate.REQUIRED,
                validate.EMAIL_VALID,
                validate.UNIQUE,
            ],
        },
        {
            fieldName: 'password',
            fieldType: 'str',
            validateFunctions: [
                validate.REQUIRED,
            ],
        },
        {
            fieldName: 'role',
            fieldType: 'str',
            validateFunctions: [
                validate.REQUIRED,
            ],
        },
    ],
};