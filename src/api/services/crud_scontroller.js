/**
 * Controller responsável por requisições CRUD
 */
const Controller = require('./controller');

class CrudController extends Controller {
    constructor(model) {
        super();
        this.model = model;
    }

    /**
     * Realiza um insert na model vinculada ao controller.
     *
     * @param {Array} values
     * @returns Object
     */
    async insert(values) {
        return this.model.insert(values);
    }

    /**
     * Realiza um update na model vinculada ao controller.
     *
     * @param {Array} values
     * @param {Array} query
     * @returns Object
     */
    async update(values, query) {
        return this.model.update(values, query);
    }

    /**
     * Realiza a listagem da model vinculada ao controller.
     *
     * @param {Array} query
     * @returns Array
     */
    async list(query) {
        return this.model.list(query);
    }

    /**
     * Obtem um registro da model vinculada ao controller.
     *
     * @param {Array} query
     * @returns Object
     */
    async get(query) {
        return this.model.get(query);
    }

    /**
     * Remove um registro da model vinculada ao controller.
     *
     * @param {Array} query
     * @returns Object
     */
    async remove(query) {
        return this.model.remove(query);
    }
}

module.exports = CrudController;