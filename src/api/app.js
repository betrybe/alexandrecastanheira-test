const express = require('express');
const userController = require('../controllers/user_controller');
const recipeController = require('../controllers/recipe_controller');

const app = express();

const crudRoutes = [
    {
        baseRoute: '/users',
        controller: userController,
    },
    {
        baseRoute: '/recipes',
        controller: recipeController,
    },
];

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// eslint-disable-next-line max-lines-per-function
crudRoutes.forEach((entity) => {
    app
        .post(entity.baseRoute, (request, response) => {
            entity.controller.insert(request.body);
            response.send('Inserindo.');
        })
        .get(entity.baseRoute, (request, response) => {
            entity.controller.list(request.body);
            response.send('Listando');
        })
        .get(entity.baseRoute, (request, response) => {
            entity.controller.get(request.body);
            response.send('Get');
        })
        .put(entity.baseRoute, (request, response) => {
            entity.controller.update(request.body);
            response.send('Atualizando');
        })
        .delete(entity.baseRoute, (request, response) => {
            entity.controller.remove(request.body);
            response.send('Deletando');
        });
});

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
