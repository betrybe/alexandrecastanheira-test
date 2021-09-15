const path = require('path');
const express = require('express');
const multer = require('multer');
const RecipeService = require('../services/recipe_service');
const LoginService = require('../services/login_service');

const uploadsPath = path.join(__dirname, '../..', 'uploads');
console.log(uploadsPath);

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, uploadsPath);
    },
    filename(request, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1];
        const novoNomeArquivo = request.params.id;
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    },
});

const upload = multer({ dest: uploadsPath, storage });
const router = express.Router();

router.post('/recipes', [
    LoginService.authorize,
    RecipeService.validateRecipeInsert,
    RecipeService.insertRoute]);

router.put('/recipes/:id/image', [
    upload.single('image'),
    LoginService.authorize,
    RecipeService.authorizeImage,
    RecipeService.imageRoute,
]);

router.get('/images/:id\.:jpeg', [
    RecipeService.getImageRoute,
]);

router.get('/recipes', [
    RecipeService.listRoute]);

router.get('/recipes/:id', [
    RecipeService.getOneRoute]);

router.put('/recipes/:id', [
    LoginService.authorize,
    RecipeService.updateRoute]);

router.delete('/recipes/:id', [
    LoginService.authorize,
    RecipeService.deleteRoute]);

module.exports = router;