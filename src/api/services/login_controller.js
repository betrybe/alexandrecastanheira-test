/**
 * Controller responsável por tratar as requisições referentes ao login.
 */
const ValidateService = require('../../helpers/validate_helper');
const UserModel = require('../models/user');
const JWTHelper = require('../../helpers/jwt_helper');
const Controller = require('./controller');

const jwt = new JWTHelper();

class LoginController extends Controller {
    /**
     * Construtor do controller.
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
    static validateLoginFields(req, res, next) {
        const email = req.body.email || '';
        const password = req.body.password || '';

        if (!email || !password) {
            return res.status(401).send({ message: 'All fields must be filled' });
        }
        if (!ValidateService.emailValid(email)) {
            return res.status(401).send({ message: 'Incorrect username or password' });
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
        const controller = new LoginController(request);
        controller.login().then((_val) => {
            response.setHeader('Content-Type', 'application/json');
            controller.sendResponse(response, controller);
        });
    }

    /**
     * Middleware para validar o token de autorização.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static authorize(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'jwt malformed' });

        jwt.verifyAccessToken(token, (err, decoded) => {
            if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
            req.body.userId = decoded.id;
        });

        next();
    }

    /**
     * Processamento do login.
     *
     * @returns Boolean
     */
    async login() {
        await this.validate.validLogin(this.email, this.password).then((validateResult) => {
            if (!validateResult.valid) {
                this.message = JSON.stringify({message: validateResult.message});
                this.status = validateResult.status;
                return false;
            }
        });

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

module.exports = LoginController;