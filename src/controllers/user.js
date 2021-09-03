let entityConfig = {
    entityName: 'users',
    fields: [
        {
            fieldName: 'name',
            fieldType: 'str',
            validateFunctions: [
                'required',
            ],
        },
        {
            fieldName: 'email',
            fieldType: 'str',
            validateFunctions: [
                'required',
                'email_valid',
                'unique',
            ],
        },
        {
            fieldName: 'password',
            fieldType: 'str',
            validateFunctions: [
                'required',
            ],
        },
        {
            fieldName: 'role',
            fieldType: 'str',
            validateFunctions: [
                'required',
            ],
        },
    ]
}

module.exports = {
    insert() {
      console.log('inserindo no mongodb');
    },
    update() {
        console.log('Atualizando no mongodb');
    },
    list() {
        console.log('Listando no mongodb');
    },
    get() {
        console.log('Realizando get no mongodb');
    }
};