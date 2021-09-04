function required(model, field, data) {
    console.log('Validando campo obrigatório.');
    if (typeof data[field.fieldName] === 'undefined') {
        const message = `O campo ${field} é obrigatório.`;
        console.log(message);
        return false;
    }

    return true;
}

function emailValid(model, field, data) {
    console.log('Validando email');
    if (typeof data[field.fieldName] === 'undefined') {
        const message = 'Informe um e-mail válido.';
        console.log(message);
        return false;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data[field.fieldName])) {
        return true;
    }
}

function unique(model, field, data) {
    console.log('Validando campo único.');
    let message = '';
    if (typeof data[field.fieldName] === 'undefined') {
        message = 'O campo deve ser único.';
        console.log(message);
        return false;
    }

    const query = {
        [field.fieldName]: data[field.fieldName],
    };

    const results = model.list(query);
    if (results.count() > 0) {
        message = 'O campo deve ser único.';
        console.log(message);
        return false;
    }

}

export const REQUIRED = 'required';
export const EMAIL_VALID = 'emailValid';
export const UNIQUE = 'unique';

const mappedMethods = [
    { REQUIRED: required },
    { EMAIL_VALID: emailValid },
    { UNIQUE: unique },
];

export function checkModel(model, data) {
    const schema = model.getSchema();
    const fieldsConfig = schema.entityConfig.fields;
    let isValid = true;
    fieldsConfig.forEach(((field) => {
        field.validateFunctions.forEach((func) => {
            isValid = mappedMethods[func](model, field, data);
        });
    }));

    return isValid;
}
