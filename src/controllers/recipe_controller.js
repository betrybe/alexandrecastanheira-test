/**
 * Controller responsável por tratar as requisições da entidade de receitas.
 */
const CrudController = require('./crud_scontroller');
const ValidateService = require('../helpers/validate_helper');
const RecipeModel = require('../models/recipe');

const model = new RecipeModel();

class RecipeController extends CrudController {
    /**
     * Construtor do controller.
     *
     * @param {Object} request 
     */
    constructor(request) {
        super(model);
        this.request = request.query;
        this.params = request.params;
        this.body = request.body;
        this.message = '';
        this.status = 200;
        this.validate = new ValidateService(this.model, request);
    }

    /**
     * Middleware para validar a operação de insert.
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static validateRecipeInsert(req, res, next) {
        const ingredients = req.query.ingredients || '';
        const name = req.query.name || '';
        const preparation = req.query.preparation || '';
    
        if (!ingredients || !name || !preparation) {
            return res.status(400).send({ message: 'All fields must be filled.' });
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
        const authenticated = request.query.userId || '';
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
    async insert() {
        const values = this.body;
        const result = await super.insert(values);

        if (result.ok && result.insertedCount === 1) {
            this.message = `
                ${this.model.entityName} com ID=${result.insertedId} foi inserido com sucesso.`;
            return true;
        }

        this.message = JSON.stringify({ recipe: result });
        this.status = 200;
        return result;
    }

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
            this.message = JSON.stringify(result);
            this.status = 200;
        });
    }

    /**
     * Processamento da operação de obter um registro.
     * @returns boolean
     */
    async get() {
        const validateResult = this.validate.checkGet(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.params;
        await super.get(query).then((result) => {
            this.message = JSON.stringify(result);
            this.status = 200;
        });
    }

    /**
     * Processamento da operação de atualização.
     * @returns boolean
     */
    async update() {
        const validateResult = this.validate.checkUpdate();
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const values = this.body;
        const query = this.params;
        await super.update(values, query).then((result) => {
            if (result.ok && result.updatedCount === 1) {
                const jsonReturn = {
                    message: 'Atualizado com sucesso.',
                };

                this.message = JSON.stringify(jsonReturn);
                this.status = 200;
            }
        });

        return true;
    }

    /**
     * Processamento da operação de remoção.
     * @returns boolean
     */
    async remove() {
        const validateResult = this.validate.checkRemove(this.request.query);
        if (!validateResult.valid) {
            this.message = validateResult.message;
            this.status = validateResult.status;
            return false;
        }

        const query = this.params;
        super.remove(query);
    }
}

module.exports = RecipeController;