class ValidateService {
    constructor(model, data) {
        console.log('constructor');
        console.log(data);
        this.model = model;
        this.data = data;

        this.result = {
            message: '',
            valid: true,
            status: 200,
        };
    }

    required(data, field) {
        console.log('printando o field');
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

    unique(field, value) {
        console.log(field);
        console.log(value);
        const query = {
            [this.field]: value,
        };

        if (!this.model.list(query)) {
            this.result.valid = false;
            this.result.message = `${field.fieldName} already registred.`;
            this.result.status = 409;
            return false;
        }

        return true;
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
            });
        }));

        return this.result;
    }

    checkList() {
        return this.result;
    }

    checkRemove() {
        return this.result;
    }
}

module.exports = ValidateService;