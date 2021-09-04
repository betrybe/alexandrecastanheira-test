/**
 * Mapeamento da entidade de receitas.
 */
const validate = require('../../api/services/validate_service');

exports.entityConfig = {
    entityName: 'recipes',
    fields: [
        {
            fieldName: 'name',
            fieldType: 'str',
            validateFunctions: [
                validate.REQUIRED,
            ],
        },
        {
            fieldName: 'ingredients',
            fieldType: 'str',
            validateFunctions: [
                validate.REQUIRED,
            ],
        },
        {
            fieldName: 'preparation',
            fieldType: 'str',
            validateFunctions: [
                validate.REQUIRED,
            ],
        },
    ],
};