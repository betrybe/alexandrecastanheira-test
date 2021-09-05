const express = require('express');
const UserController = require('../controllers/user_controller');
const RecipeController = require('../controllers/recipe_controller');
const LoginController = require('../controllers/login_controller');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// eslint-disable-next-line max-lines-per-function
app.post('/users', (request, response) => {
    const controller = new UserController(request);
    controller.insert().then((_val) => {
        response.setHeader('Content-Type', 'application/json');
        response.status(controller.status).send(controller.message);
    });
});

app.post('/login', (request, response) => {
    const controller = new LoginController(request);
    controller.login();
    response.setHeader('Content-Type', 'application/json');
    response.status(controller.status).send(controller.message);
    /*
    controller.login().then((_val) => {
        response.setHeader('Content-Type', 'application/json');
        response.status(controller.status).send(controller.message);
    });
    */
});

app.post('/recipes', (request, response) => {
    const controller = new RecipeController(request);
    controller.insert().then((_val) => {
        response.setHeader('Content-Type', 'application/json');
        response.status(controller.status).send(controller.message);
    });
});

app.get('/recipes', (request, response) => {
    const controller = new RecipeController(request);
    controller.list().then((_val) => {
        response.setHeader('Content-Type', 'application/json');
        response.status(controller.status).send(controller.message);
    });
});

app.get('/recipes/:id', (request, response) => {
    const controller = new RecipeController(request);
    controller.get().then((_val) => {
        response.setHeader('Content-Type', 'application/json');
        response.status(controller.status).send(controller.message);
    });
});

app.put('/recipes/:id', (request, response) => {
    const controller = new RecipeController(request);
    controller.update().then((_val) => {
        response.setHeader('Content-Type', 'application/json');
        response.status(controller.status).send(controller.message);
    });
});

app.delete('/recipes/:id', (request, response) => {
    const controller = new RecipeController(request);
    controller.remove().then((_val) => {
        response.setHeader('Content-Type', 'application/json');
        response.status(controller.status).send(controller.message);
    });
});

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
