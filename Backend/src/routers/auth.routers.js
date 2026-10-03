const express = require('express');
const authController = require('../controller/auth.controller');
const authMiddleware  = require('../middlewares/auth.middleware');

const authRouter =express.Router();

authRouter.post('/register',authController.registerUserController);

authRouter.post('/login', authController.loginUserController);

authRouter.get('/logout', authController.logoutUserController);

/**
 * @route GET api/auth/get-me
 * @description get the current details of logged in user
 * @access private
 */

authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController );

module.exports = authRouter;