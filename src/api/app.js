const path = require('path');
const express = require('express');
const userRoutes = require('./routes/user_routes');
const recipeRoutes = require('./routes/recipe_routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(userRoutes);
app.use(recipeRoutes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
    response.send();
});

// Tratamento de erros.
app.use((error, request, response, _next) => {
    response
        .status(error.httpStatusCode)
        .json({ message: error.message });
});

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;