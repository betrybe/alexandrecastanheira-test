/**
 * Service responsável por tratar as requisições da entidade de receitas.
 */
const { resolve } = require('path');
const CrudService = require('./crud_service');
const RecipeModel = require('../models/recipe');
const UserModel = require('../models/user');

const model = new RecipeModel();

class RecipeService extends CrudService {
    /**
     * Construtor do service.
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
    static validateRecipeInsert(request, res, next) {
        try {
            if (!request.body.ingredients || !request.body.name || !request.body.preparation) {
                return res.status(400).send({ message: 'Invalid entries. Try again.' });
            }
        } catch (error) {
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
            const service = new RecipeService(request);
            service.insert().then((_val) => {
                service.sendResponse(response);
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
        const service = new RecipeService(request);
        service.list().then((_val) => {
            service.sendResponse(response);
        });
    }

    /**
     * Rota para obter registro específico.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static getOneRoute(request, response) {
        const service = new RecipeService(request);
        service.get().then((_val) => {
            service.sendResponse(response);
        });
    }

    /**
     * Rota para alteração de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static updateRoute(request, response) {
        const service = new RecipeService(request);
        service.update().then((_val) => {
            service.sendResponse(response);
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

        const service = new RecipeService(request);
        service.update().then((result) => {
            service.message = JSON.stringify(result);
            service.status = 200;
            service.sendResponse(response);
        });
    }

    static getImageRoute(request, response) {
        const abPath = resolve('./uploads');
        const filepath = `${abPath}/${request.params.id}.jpg`;
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
        const service = new RecipeService(request);
        service.authImage().then((isValid) => {
            if (!isValid) {
                return response.status(401).json({ message: 'role not authorized' });
            }

            next();
        });
    }

    /**
     * Rota para remoção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static deleteRoute(request, response) {
        const service = new RecipeService(request);
        service.remove().then((_val) => {
            service.sendResponse(response);
        });
    }

    /**
     * Processamento da operação de listagem.
     * @returns boolean
     */
    async list() {
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
}

module.exports = RecipeService;