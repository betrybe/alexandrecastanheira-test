const express = require('express');
const multer = require('multer');
const UserController = require('../api/services/user_controller');
const RecipeController = require('../api/services/recipe_controller');
const LoginController = require('../api/services/login_controller');

const app = express();
const upload = multer();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
    response.send();
});

app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

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
