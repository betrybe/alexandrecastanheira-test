/**
 * Service abstrato responsável por requisições CRUD
 */
const Service = require('./service');
const ValidateService = require('../../helpers/validate_helper');

class CrudService extends Service {
    /**
     * Construtor do service.
     *
     * @param {Object} request
     * @param {Object} model
     */
    constructor(request, model) {
        super();
        this.request = request;
        this.query = request.query;
        this.body = request.body;
        this.params = request.params;
        this.model = model;

        this.validate = new ValidateService(this.model, this.query);
    }

    /**
     * Realiza um insert na model vinculada ao service.
     *
     * @param {Array} values
     * @returns Object
     */
    async insert() {
        let result = '';
        try {
            result = await this.model.insert(this.body);
            this.message = JSON.stringify({ [this.model.entitySingular]: result });
            this.status = 201;
        } catch (error) {
            this.message = JSON.stringify({ message: error });
            this.status = 500;
        }
        return result;
    }

    /**
     * Realiza um update na model vinculada ao service.
     *
     * @param {Array} values
     * @param {Array} query
     * @returns Object
     */
    async update() {
        let result = '';
        try {
            result = await this.model.update(this.body, this.params.id);
            this.message = JSON.stringify(result);
            this.status = 200;
        } catch (error) {
            this.message = JSON.stringify({ message: error });
            this.status = 500;
        }

        return result;
    }

    /**
     * Realiza a listagem da model vinculada ao service.
     *
     * @param {Array} query
     * @returns Array
     */
    async list(query) {
        let result = '';
        try {
            result = await this.model.list(query);
        } catch (error) {
            this.message = JSON.stringify({ message: error });
            this.status = 500;
        }

        return result;
    }

    /**
     * Obtem um registro da model vinculada ao service.
     *
     * @param {Array} query
     * @returns Object
     */
    async get() {
        let result = '';
        try {
            result = await this.model.get(this.params.id);
            if (!result) {
                this.message = JSON.stringify({ message: `${this.model.entitySingular} not found` });
                this.status = 404;
                return result;
            }

            this.message = JSON.stringify(result);
            this.status = 200;

        } catch (error) {
            this.message = JSON.stringify({ message: error });
            this.status = 500;
        }

        return result;
    }

    /**
     * Remove um registro da model vinculada ao service.
     *
     * @param {Array} query
     * @returns Object
     */
    async remove() {
        let result = '';
        try {
            result = await this.model.remove(this.params.id);
            this.message = JSON.stringify({ [this.model.entitySingular]: result });
            this.status = 204;
        } catch (error) {
            this.message = JSON.stringify({ message: error });
            this.status = 500;
        }

        return result;
    }
}

module.exports = CrudService;