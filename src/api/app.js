const express = require('express');
const UserController = require('../controllers/user_controller');
const RecipeController = require('../controllers/recipe_controller');

const app = express();


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// eslint-disable-next-line max-lines-per-function
app.post('/users', (request, response) => {
    const controller = new UserController(request);
    controller.insert();
    response.status(controller.status).send(controller.message);
});

app.post('/recipes', (request, response) => {
    const controller = new RecipeController(request);
    controller.insert();
    response.status(controller.status).send(controller.message);
});

app.put('/recipes', (request, response) => {
    const controller = new RecipeController(request);
    controller.update();
    response.status(controller.status).send(controller.message);
});

app.get('/recipes', (request, response) => {
    const controller = new RecipeController(request);
    controller.list();
    response.status(controller.status).send(controller.message);
});

app.get('/recipes', (request, response) => {
    const controller = new RecipeController(request);
    controller.get();
    response.status(controller.status).send(controller.message);
});

app.delete('/recipes', (request, response) => {
    const controller = new RecipeController(request);
    controller.remove();
    response.status(controller.status).send(controller.message);
});

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
