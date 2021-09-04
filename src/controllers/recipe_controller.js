const crud = require('../api/services/crud_service');
const validate = require('../api/services/validate_service');
const model = require('../models/recipe');

export function insert(request) {
    const isValid = validate.checkModel(model, request);
    if (isValid) {
        const values = request;
        crud.insert(model, values);
    }
}

export function update(request) {
    const isValid = validate.checkModel(model, request);
    if (isValid) {
        const values = request;
        crud.update(model, values);
    }
}

export function list(request) {
    const isValid = validate.checkModel(model, request);
    if (isValid) {
        const query = request;
        crud.list(model, query);
    }
}

export function get(request) {
    const isValid = validate.checkModel(model, request);
    if (isValid) {
        const query = request;
        crud.get(model, query);
    }
}

export function remove(request) {
    const isValid = validate.checkModel(model, request);
    if (isValid) {
        const query = request;
        crud.remove(model, query);
    }
}