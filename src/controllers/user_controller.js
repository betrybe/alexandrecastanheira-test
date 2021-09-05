const CrudController = require('./crud_scontroller');
const ValidateService = require('../api/services/validate_service');
const UserModel = require('../models/user');

const model = new UserModel();

class UserController extends CrudController {
    constructor(request) {
        super(model);
        this.request = request.query;
        this.message = '';
        this.status = 200;
        this.validate = new ValidateService(this.model, this.request);
    }

    insert() {
        const validateResult = this.validate.checkInsert(this.request.query);
        console.log('validateresult');
        console.log(validateResult);
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
}

module.exports = UserController;