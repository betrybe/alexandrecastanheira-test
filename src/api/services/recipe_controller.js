/**
 * Controller responsável por tratar as requisições da entidade de receitas.
 */
const CrudController = require('./crud_scontroller');
const RecipeModel = require('../models/recipe');
const UserController = require('./user_controller');
const UserModel = require('../models/user');

const model = new RecipeModel();

class RecipeController extends CrudController {
    /**
     * Construtor do controller.
     *
     * @param {Object} request 
     */
    constructor(request) {
        super(request, model);
    }

    /**
     * Middleware para validar a operação de insert.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static validateRecipeInsert(req, res, next) {
        const ingredients = req.body.ingredients || '';
        const name = req.body.name || '';
        const preparation = req.body.preparation || '';
    
        if (!ingredients || !name || !preparation) {
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
        const authenticated = request.body.userId || '';
        if (authenticated) {
            const controller = new RecipeController(request);
            controller.insert().then((_val) => {
                controller.sendResponse(response);
            });
        }
    }

    /**
     * Rota para listagem de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static listRoute(request, response) {
        const controller = new RecipeController(request);
        controller.list().then((_val) => {
            controller.sendResponse(response);
        });
    }

    /**
     * Rota para obter registro específico.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static getOneRoute(request, response) {
        const controller = new RecipeController(request);
        controller.get().then((_val) => {
            controller.sendResponse(response);
        });
    }

    /**
     * Rota para alteração de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static updateRoute(request, response) {
        const controller = new RecipeController(request);
        controller.update().then((_val) => {
            controller.sendResponse(response);
        });
    }

    /**
     * Rota para alteração de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static imageRoute(request, response) {
        const filepath = `${request.headers.host}/src/uploads/${request.params.id}.jpeg`;
        request.body.image = filepath;

        const controller = new RecipeController(request);
        controller.update().then((result) => {
            controller.message = JSON.stringify(result);
            controller.status = 200;
            controller.sendResponse(response);
        });
    }

    static getImageRoute(request, response) {
        const {resolve} = require('path');
        console.log('path absoluto');
        const abPath = resolve('./uploads');
        const filepath = `${abPath}/${request.params.id}.jpg`;
        console.log(filepath);
        response.status(200).sendFile(filepath);
    }

    async authImage() {
        const recipe = await this.get();
        if (!recipe) return false;

        const user = await new UserModel().get(this.body.userId);
        if (!user) return false;

        const isImageOwner = recipe.userId === this.body.userId;
        const isAdmin = user.role === 'admin';

        return (isImageOwner || isAdmin);
    }

    /**
     * Middleware para validar o token de autorização.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
     static authorizeImage(request, response, next) {
        const controller = new RecipeController(request);
        controller.authImage(request).then((isValid) => {
            console.log('chegou aqui');

            if (!isValid) {
                return response.status(401).json({ message: 'deu ruim na permissão' });
            }

            next();
        });

        /*
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: 'missing auth token' });

        jwt.verifyAccessToken(token, (err, decoded) => {
            if (err) return res.status(401).json({ message: 'jwt malformed' });
            req.body.userId = decoded.id;
        });
        */
    }

    /**
     * Rota para remoção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static deleteRoute(request, response) {
        const controller = new RecipeController(request);
        controller.remove().then((_val) => {
            controller.sendResponse(response);
        });
    }

    /**
     * Processamento da operação de inserção.
     * @returns boolean
     */
    /*
    async insert() {
        const values = this.body;
        const result = await super.insert(values);
        this.message = JSON.stringify({ recipe: result });
        this.status = 201;
        return result;
    }
    */

    /**
     * Processamento da operação de listagem.
     * @returns boolean
     */
    async list() {
        const validateResult = this.validate.checkList(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.body;
        await super.list(query).then((result) => {
            if (result) {
                this.message = JSON.stringify(result);
                this.status = 200;
            } else {
                this.message = JSON.stringify({ message: 'recipe not found' });
                this.status = 404;
            }
        });
    }

    /**
     * Processamento da operação de obter um registro.
     * @returns boolean
     */
    /*
    async get() {
        await super.get(this.params.id).then((result) => {
            if (result) {
                this.message = JSON.stringify(result);
                this.status = 200;
            } else {
                this.message = JSON.stringify({ message: 'recipe not found' });
                this.status = 404;
            }
        });
    }
    */

    /**
     * Processamento da operação de atualização.
     * @returns boolean
     */
    /*
    async update() {
        const values = this.body;
        const result = await super.update(values, this.params.id);
        this.message = JSON.stringify({ recipe: result });
        this.status = 200;
        return result;
    }
    */

    /**
     * Processamento da operação de remoção.
     * @returns boolean
     */
    /*
    async remove() {
        await super.remove(this.params.id);
    }
    */
}

module.exports = RecipeController;