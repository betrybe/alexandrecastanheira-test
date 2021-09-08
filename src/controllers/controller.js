/**
 * Controller base
 */
class Controller {
    /**
     * Construtor do controller.
     */
    constructor() {
        this.message = '';
        this.status = 200;
    }

    /**
     * A partir dos atributos do controller, aplica os mesmos no response.
     * @param {Object} response
     */
    sendResponse(response) {
        response.setHeader('Content-Type', 'application/json');
        response.status(this.status).send(this.message);
    }
}

module.exports = Controller;