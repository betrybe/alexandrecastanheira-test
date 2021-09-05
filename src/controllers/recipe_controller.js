const CrudController = require('./crud_scontroller');
const ValidateService = require('../api/services/validate_service');
const RecipeModel = require('../models/recipe');

const model = new RecipeModel();

class RecipeController extends CrudController {
    constructor(request) {
        super(model);
        this.request = request.query;
        this.params = request.params;
        this.message = '';
        this.status = 200;
        this.validate = new ValidateService(this.model, this.request);
    }

    async insert() {
        const validateResult = this.validate.checkInsert(this.request.query);
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

    async list() {
        const validateResult = this.validate.checkList(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.request;
        await super.list(query).then((result) => {
            this.message = JSON.stringify(result);
            this.status = 200;
        });
    }

    async get() {
        const validateResult = this.validate.checkGet(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.params;
        await super.get(query).then((result) => {
            this.message = JSON.stringify(result);
            this.status = 200;
        });
    }

    async update() {
        const validateResult = this.validate.checkUpdate();
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const values = this.request;
        const query = this.params;
        await super.update(values, query).then((result) => {
            if (result.ok && result.updatedCount === 1) {
                const jsonReturn = {
                    message: 'Atualizado com sucesso.',
                };

                this.message = JSON.stringify(jsonReturn);
                this.status = 200;
            }
        });

        return true;
    }

    async remove() {
        const validateResult = this.validate.checkRemove(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.params;
        super.remove(query);
    }
}

module.exports = RecipeController;