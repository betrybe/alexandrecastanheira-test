const path = require('path');
const express = require('express');

const app = express();
const userRoutes = require('./routes/user_routes');
const recipeRoutes = require('./routes/recipe_routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(userRoutes);
app.use(recipeRoutes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
    response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
