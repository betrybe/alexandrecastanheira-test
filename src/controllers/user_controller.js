/**
 * Controller responsável para tratar as requisições da entidade de usuários.
 */
const CrudController = require('./crud_scontroller');
const ValidateService = require('../helpers/validate_helper');
const UserModel = require('../models/user');

const model = new UserModel();

class UserController extends CrudController {
    /**
     * Construtor do controller.
     *
     * @param {Object} request
     */
    constructor(request) {
        super(model);
        this.request = request.query;
        this.body = request.body;
        this.message = '';
        this.status = 200;
        this.validate = new ValidateService(this.model, this.request);
    }

    /**
     * Middleware para tratamento dos campos durante o insert.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     *
     * @returns void
     */
    static validateUserInsert(req, res, next) {
        const email = req.body.email || '';
        const name = req.body.name || '';
        const password = req.body.password || '';

        const fieldsMissing = !email || !name || !password;
        if (fieldsMissing || !ValidateService.emailValid(email)) {
            return res.status(400).send({ message: 'Invalid entries. Try again.' });
        }

        next();
    }

    /**
     * Rota para inserção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
     static insertRoute(request, response) {
        const controller = new UserController(request);
        controller.insert().then((_val) => {
            controller.sendResponse(response);
        });
    }

    /**
     * Processamento da operação de inserção.
     *
     * @returns boolean
     */
    async insert() {
        const isUnique = await this.validate.unique('email', this.body.email);
        if (!isUnique) {
            this.message = JSON.stringify({ message: 'Email already registred.' });
            this.status = 409;
            return false;
        }

        this.body.role = 'user';
        const values = this.body;
        console.log('values');
        console.log(values);
        const result = await super.insert(values);
        this.message = JSON.stringify({ user: result });
        this.status = 200;
        return result;
    }
}

module.exports = UserController;