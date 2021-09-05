class ValidateService {
    constructor(model, data) {
        this.model = model;
        this.data = data;

        this.result = {
            message: '',
            valid: true,
            status: 200,
        };
    }

    required(data, field) {
        if (typeof data[field] === 'undefined') {
            this.result.valid = false;
            this.result.message = 'Invalid entries. Try again.';
            this.result.status = 400;
            return false;
        }

        return true;
    }

    emailValid(_field, value) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            this.result.valid = false;
            this.result.message = 'Invalid entries. Try again.';
            this.result.status = 400;
            return false;
        }

        return true;
    }

    async unique(field, value) {
        const query = {
            [field.fieldName]: value,
        };

        const existingDocuments = await this.model.count(query);

        if (existingDocuments > 0) {
            this.result.valid = false;
            this.result.message = `${field.fieldName} already registred.`;
            this.result.status = 409;
            return false;
        }

        return true;
    }

    async validLogin(email, password) {
        if (email === '' || password === '') {
            this.result.message = 'All fields must be filled.';
            this.result.status = 401;
        }

        const query = {
            email,
            password,
        }

        const result = await this.model.get(query);
        console.log('result: ');
        console.log(result);
        return this.result;
    }

    checkInsert() {
        this.model.fields.forEach(((field) => {
            if (field.isRequired && !this.required(this.data, field.fieldName)) {
                this.result.message = 'All fields must be filled';
                this.result.valid = false;
                return this.result;
            }

            field.validateFunctions.forEach((validateFunc) => {
                if (validateFunc === 'emailValid') {
                    this.emailValid(field, this.data[field.fieldName]);
                    return this.result;
                }

                if (validateFunc === 'unique') {
                    this.unique(field, this.data[field.fieldName]);
                        return this.result;
                }
            });
        }));

        return this.result;
    }

    checkUpdate() {
        return this.result;
    }

    checkList() {
        return this.result;
    }

    checkRemove() {
        return this.result;
    }

    checkGet() {
        return this.result;
    }
}

module.exports = ValidateService;