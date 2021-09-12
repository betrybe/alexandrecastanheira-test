/**
 * Service base
 */
class Service {
    /**
     * Construtor do service.
     */
    constructor() {
        this.message = '';
        this.status = 200;
    }

    /**
     * A partir dos atributos do service, aplica os mesmos no response.
     * @param {Object} response
     */
    sendResponse(response) {
        try {
            response.setHeader('Content-Type', 'application/json');
            response.status(this.status).send(this.message);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Service;