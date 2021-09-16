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
    static async validateUserInsert(request, response, next) {
        if (!request.body.email || !request.body.name || !request.body.password) {
            const err = new Error();
            err.httpStatusCode = 400;
            err.message = 'Invalid entries. Try again.';
            return next(err);
        }

        return next();
    }

    /**
     * Middleware para validar se o e-mail é válido.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static async validateEmail(request, response, next) {
        const email = request.body.email || '';
        if (!ValidateService.emailValid(email)) {
            const err = new Error();
            err.httpStatusCode = 400;
            err.message = 'Invalid entries. Try again.';
            return next(err);
        }

        return next();
    }

    /**
     * Middleware para validar se um determinado campo é único.
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static async validateUnique(request, response, next) {
        const service = new UserService(request);
        const uniqueField = 'email';
        const uniqueValue = request.body[uniqueField];
        service.validate.unique(uniqueField, uniqueValue).then((isUnique) => {
            if (!isUnique) {
                const err = new Error();
                err.httpStatusCode = 409;
                err.message = 'Email already registered';
                return next(err);
            }

            return next();
        });
    }

    /**
     * Rota para inserção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
     static async insertRoute(request, response) {
        request.body.role = 'user';
        const service = new UserService(request);
        service.insert().then((_val) => {
            service.sendResponse(response);
        });
    }

    /**
     * Rota para inserção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
     static async insertAdminRoute(request, response) {
        request.body.role = 'admin';
        const service = new UserService(request);
        service.insert().then((_val) => {
            service.sendResponse(response);
        });
    }
}

module.exports = UserService;