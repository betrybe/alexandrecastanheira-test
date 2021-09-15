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

app.use((err, req, res, _next) => {
    res.status(err.status || 500);
    res.send(err.message);
});
/*
app.use((error, request, response, _next) => {
    response
        .status(error.httpStatusCode)
        .json(JSON.pretify({ message: error.message }));
});
*/

/*
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
*/

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
