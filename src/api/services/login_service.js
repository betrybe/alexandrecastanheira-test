/**
 * Service responsável por tratar as requisições referentes ao login.
 */
const ValidateService = require('../../helpers/validate_helper');
const UserModel = require('../models/user');
const JWTHelper = require('../../helpers/jwt_helper');
const Service = require('./service');

const jwt = new JWTHelper();

class LoginService extends Service {
    /**
     * Construtor do service.
     *
     * @param {Object} request
     */
    constructor(request) {
        super();
        this.email = request.body.email || '';
        this.password = request.body.password || '';
        this.jwt = jwt;
        this.model = new UserModel();
        this.validate = new ValidateService(this.model, request);
    }

    /**
     * Middleware para validar os campos enviados para login.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static validateLoginFields(request, res, next) {
        const email = request.body.email || '';
        const password = request.body.password || '';

        if (!email || !password) {
            const err = new Error();
            err.httpStatusCode = 401;
            err.message = 'All fields must be filled';
            return next(err);
        }

        next();
    }

    /**
     * Rota para o login.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static loginRoute(request, response) {
        const service = new LoginService(request);
        service.login().then((_val) => {
            service.sendResponse(response);
        });
    }

    /**
     * Middleware para validar o token de autorização.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static authorize(request, res, next) {
        const token = request.headers.authorization;
        if (!token) {
            const err = new Error();
            err.httpStatusCode = 401;
            err.message = 'missing auth token';
            return next(err);
        }

        jwt.verifyAccessToken(token, (error, decoded) => {
            if (error) {
                const err = new Error();
                err.httpStatusCode = 401;
                err.message = 'jwt malformed';
                return next(err);
            }

            request.body.userId = decoded.id;
        });

        next();
    }

    /**
     * Middleware para validar o token de autorização.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
     static onlyAdmin(request, response, next) {
        const model = new UserModel();
        model.get(request.body.userId).then((user) => {
            if (user.role !== 'admin') {
                const err = new Error();
                err.httpStatusCode = 403;
                err.message = 'Only admins can register new admins';
                return next(err);
            }

            next();
        });
    }

    /**
     * Middleware para verificar se o login é válido.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static validateLogin(request, response, next) {
        const email = request.body.email || '';
        const password = request.body.password || '';

        const validate = new ValidateService(new UserModel(), request);

        validate.validLogin(email, password).then((result) => {
            if (!result.valid) {
                const err = new Error();
                err.httpStatusCode = result.status;
                err.message = result.message;
                return next(err);
            }

            next();
        });
    }

    /**
     * Processamento do login.
     *
     * @returns Boolean
     */
    async login() {
        const query = {
            email: this.email,
            password: this.password,
        };

        await this.model.getByQuery(query).then((user) => {
            if (!user) return false;

            const userId = user['_id'] || '';
            const responseObject = {
                token: this.jwt.generateAccessToken(userId),
            };

            this.message = JSON.stringify(responseObject);
            this.status = 200;
            return true;
        });

        return false;
    }
}

module.exports = LoginService;