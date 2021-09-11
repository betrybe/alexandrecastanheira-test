const path = require('path');
const express = require('express');
const multer = require('multer');
const UserController = require('../api/services/user_controller');
const RecipeController = require('../api/services/recipe_controller');
const LoginController = require('../api/services/login_controller');

const app = express();

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1];
        const novoNomeArquivo = req.params.id;
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    },
});

const upload = multer({ dest: 'uploads/', storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
    response.send();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ...

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', [
    UserController.validateUserInsert,
    UserController.insertRoute]);

app.post('/users/admin', [
    LoginController.authorize,
    LoginController.onlyAdmin,
    UserController.validateUserInsert,
    UserController.insertAdminRoute]);

app.post('/login', [
    LoginController.validateLoginFields,
    LoginController.loginRoute]);

app.post('/recipes', [
    RecipeController.validateRecipeInsert,
    LoginController.authorize,
    RecipeController.insertRoute]);

app.put('/recipes/:id/image', [
    LoginController.authorize,
    RecipeController.authorizeImage,
    upload.single('image'),
    RecipeController.imageRoute,
]);

app.get('/images/:id\.:jpeg', [
    RecipeController.getImageRoute,
]);

app.get('/recipes/:id/image', [
    RecipeController.getImageRoute,
]);
/*
app.put('/recipes/:id/image', upload.single('image'), (req, res) => {
    const { nome, site } = req.body;
    res.json({ nome, site });
});
*/

app.get('/recipes', [
    RecipeController.listRoute]);

app.get('/recipes/:id', [
    RecipeController.getOneRoute]);

app.put('/recipes/:id', [
    LoginController.authorize,
    RecipeController.updateRoute]);

app.delete('/recipes/:id', [
    LoginController.authorize,
    RecipeController.deleteRoute]);

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
