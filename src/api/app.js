const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const UserController = require('../controllers/user_controller');
const RecipeController = require('../controllers/recipe_controller');
const LoginController = require('../controllers/login_controller');

const app = express();
const upload = multer();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
    response.send();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', [
    UserController.validateUserInsert,
    UserController.insertRoute]);

app.post('/login', [
    LoginController.validateLoginFields,
    LoginController.loginRoute]);

app.post('/recipes', [
    RecipeController.validateRecipeInsert,
    LoginController.authorize,
    RecipeController.insertRoute]);

app.get('/recipes', [
    RecipeController.listRoute]);

app.get('/recipes/:id', [
    RecipeController.getOneRoute]);

app.put('/recipes/:id', [
    LoginController.authorize,
    RecipeController.updateRoute]);

app.delete('/recipes/:id', [
    RecipeController.deleteRoute]);

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
