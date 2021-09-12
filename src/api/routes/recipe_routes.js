const express = require('express');
const multer = require('multer');
const RecipeService = require('../services/recipe_service');
const LoginService = require('../services/login_service');

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, 'uploads/');
    },
    filename(request, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1];
        const novoNomeArquivo = request.params.id;
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    },
});

const upload = multer({ dest: 'uploads/', storage });
const router = express.Router();

router.post('/recipes', [
    RecipeService.validateRecipeInsert,
    LoginService.authorize,
    RecipeService.insertRoute]);

router.put('/recipes/:id/image', [
    LoginService.authorize,
    RecipeService.authorizeImage,
    upload.single('image'),
    RecipeService.imageRoute,
]);

router.get('/images/:id\.:jpeg', [
    RecipeService.getImageRoute,
]);
/*
router.get('/recipes/:id/image', [
    RecipeService.getImageRoute,
]);
*/

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