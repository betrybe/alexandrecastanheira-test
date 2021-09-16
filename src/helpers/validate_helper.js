class ValidateHelper {
    constructor(model, data) {
        this.model = model;
        this.data = data;

        this.result = {
            message: '',
            valid: true,
            status: 200,
        };
    }

    /**
     * Verifica se um email está em um formato válido.
     *
     * @param {string} value
     * @returns boolean
     */
    static emailValid(value) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return false;
        }

        return true;
    }

    async unique(field, value) {
        const query = {
            [field]: value,
        };

        const count = await this.model.count(query);
        if (count > 0) {
            this.result.message = 'Email already registered';
            this.result.valid = false;
            this.result.status = 409;
            return false;
        }

        return true;
    }

    loginFieldsRequired(email, password) {
        if (email === '' || password === '') {
            this.result.message = 'All fields must be filled';
            this.result.status = 401;
            this.result.valid = false;
            return false;
        }

        return true;
    }

    async loginCorrect(email, password) {
        const query = {
            email,
            password,
        }

        await this.model.getByQuery(query).then((result) => {
            if (result == null || typeof result['_id'] === 'undefined') {
                this.result.message = 'Incorrect username or password';
                this.result.status = 401;
                this.result.valid = false;
                return false;
            }

            return true;
        });

        return true;
    }

    async validLogin(email, password) {
        if (!this.loginFieldsRequired(email, password)) {
            return this.result;
        }

        await this.loginCorrect(email, password).then((_res) => this.result);
        return this.result;
    }
}

module.exports = ValidateHelper;