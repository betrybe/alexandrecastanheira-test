const ValidateService = require('../api/services/validate_service');

// const UserModel = require('../models/user');
// const model = new UserModel();

class LoginController {
    constructor(request) {
        this.email = request.query.email || 'email padrao';
        this.password = request.query.password || 'senha padrao';
        this.message = '';
        this.status = 200;
        this.validate = new ValidateService(this.model, this.request);
    }

    login() {
        this.validate.validLogin(this.email, this.password);
        return this.validate.result;
    }
}

module.exports = LoginController;