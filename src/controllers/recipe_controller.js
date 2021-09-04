const CrudController = require('./crud_scontroller');
const ValidateService = require('../api/services/validate_service');
const RecipeModel = require('../models/recipe');

const model = new RecipeModel();

class RecipeController extends CrudController {
    constructor(request) {
        super(model);
        this.request = request.query;
        this.message = '';
        this.status = 200;
        this.validate = new ValidateService(this.model, this.request);
    }

    insert() {
        const validateResult = this.validate.checkModel(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const values = this.request;
        const result = super.insert(values);
        if (result.ok && result.insertedCount === 1) {
            this.message = `
                ${this.model.entityName} com ID=${result.insertedId} foi inserido com sucesso.`;
            return true;
        }
    }

    update() {
        const validateResult = this.validate.checkModel();
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const values = this.request;
        const result = super.update(values);
        if (result.ok && result.updatedCount === 1) {
            this.message = `
                ${this.model.entityName} com ID=${result.insertedId} foi atualizado com sucesso.`;
            return true;
        }
    }

    list() {
        const validateResult = this.validate.checkModel(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.request;
        super.list(query);
    }

    get() {
        const validateResult = this.validate.checkModel(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.request;
        super.get(query);
    }

    remove() {
        const validateResult = this.validate.checkModel(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.request;
        super.remove(query);
    }
}

module.exports = RecipeController;