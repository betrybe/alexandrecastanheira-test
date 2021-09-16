const express = require('express');
const UserService = require('../services/user_service');
const LoginService = require('../services/login_service');

const router = express.Router();

router.post('/users', [
    UserService.validateUserInsert,
    UserService.validateEmail,
    UserService.validateUnique,
    UserService.insertRoute]);

router.post('/users/admin', [
    LoginService.authorize,
    LoginService.onlyAdmin,
    UserService.validateUserInsert,
    UserService.validateEmail,
    UserService.validateUnique,
    UserService.insertAdminRoute]);

router.post('/login', [
    LoginService.validateLoginFields,
    UserService.validateEmail,
    LoginService.validateLogin,
    LoginService.loginRoute]);

module.exports = router;