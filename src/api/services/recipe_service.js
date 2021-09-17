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
    static async validateRecipeInsert(request, _response, next) {
        if (!request.body.ingredients || !request.body.name || !request.body.preparation) {
            const err = new Error();
            err.httpStatusCode = 400;
            err.message = 'Invalid entries. Try again.';
            return next(err);
        }

        next();
    }

    /**
     * Middleware para validar o token de autorização.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
     static async authorizeImage(request, response, next) {
        const service = new RecipeService(request);

        const recipe = await service.get();
        if (recipe) {
            const user = await new UserModel().get(request.body.userId);
            if (!user) return false;

            const isImageOwner = recipe.userId === request.body.userId;
            const isAdmin = user.role === 'admin';

            if (isImageOwner || isAdmin) return next();
        }

        const err = new Error();
        err.httpStatusCode = 401;
        err.message = 'role not authorized';
        return next(err);
    }

    /**
     * Rota para inserção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static async insertRoute(request, response) {
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
    static async listRoute(request, response) {
        const service = new RecipeService(request);
        const query = request.body;
        await service.list(query).then((result) => {
            if (!result) {
                const err = new Error();
                err.httpStatusCode = 404;
                err.message = 'recipe not found';
                throw err;
            }

            return response.status(200).json(result);
        });
    }

    /**
     * Rota para obter registro específico.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static async getOneRoute(request, response) {
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
    static async updateRoute(request, response) {
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
    static async imageRoute(request, response) {
        const filepath = `${request.headers.host}/src/uploads/${request.params.id}.jpeg`;
        request.body.image = filepath;

        const service = new RecipeService(request);
        service.update().then((result) => {
            service.message = JSON.stringify(result);
            service.status = 200;
            service.sendResponse(response);
        });
    }

    static async getImageRoute(request, response) {
        const abPath = resolve('./src/uploads');
        const filepath = `${abPath}/${request.params.id}.jpg`;
        response.status(200).sendFile(filepath);
    }

    /**
     * Rota para remoção de registros.
     *
     * @param {Object} request
     * @param {Object} response
     */
    static async deleteRoute(request, response) {
        const service = new RecipeService(request);
        service.remove().then((_val) => {
            service.sendResponse(response);
        });
    }
}

module.exports = RecipeService;