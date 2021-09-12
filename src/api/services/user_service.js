/**
 * Service responsável para tratar as requisições da entidade de usuários.
 */
const CrudService = require('./crud_service');
const ValidateService = require('../../helpers/validate_helper');
const UserModel = require('../models/user');

const model = new UserModel();

class UserService extends CrudService {
    /**
     * Construtor do service.
     *
     * @param {Object} request
     */
    constructor(request) {
        super(request, model);
    }

    /**
     * Middleware para tratamento dos campos durante o insert.
     *
     * @param {Object} request
     * @param {Object} res
     * @param {Object} next
     *
     * @returns void
     */
    static validateUserInsert(request, response, next) {
        const email = request.body.email || '';
        const name = request.body.name || '';
        const password = request.body.password || '';
        if (!email || !name || !password) {
            return response.status(400).send({ message: 'Invalid entries. Try again.' });
        }

        next();
    }

    static validateEmail(request, response, next) {
        const email = request.body.email || '';
        if (!ValidateService.emailValid(email)) {
            return response.status(400).send({ message: 'Invalid entries. Try again.' });
        }

        next();
    }

    static validateUnique(request, response, next) {
        const service = new UserService(request);
        const uniqueField = 'email';
        const uniqueValue = request.body[uniqueField];
        service.validate.unique(uniqueField, uniqueValue).then((isUnique) => {
            if (!isUnique) {
                return response.status(409).send({ message: 'Email already registered' });
            }

            next();
        });
    }

    /**
     * Rota para inserção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
     static insertRoute(request, response) {
        const service = new UserService(request);
        const defaultRole = 'user';
        service.insert(defaultRole).then((_val) => {
            service.sendResponse(response);
        });
    }

    /**
     * Rota para inserção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
     static insertAdminRoute(request, response) {
        const service = new UserService(request);
        const defaultRole = 'admin';
        service.insert(defaultRole).then((_val) => {
            service.sendResponse(response);
        });
    }

    /**
     * Processamento da operação de inserção.
     *
     * @returns boolean
     */
    async insert(defaultRole) {
        const isUnique = await this.validate.unique('email', this.body.email);
        if (!isUnique) {
            this.message = JSON.stringify({ message: 'Email already registered' });
            this.status = 409;
            return false;
        }

        this.body.role = defaultRole;
        const values = this.body;
        const result = await super.insert(values);
        this.message = JSON.stringify({ user: result });
        this.status = 201;
        return result;
    }
}

module.exports = UserService;