import { Router } from "express";
import { privateAuth } from '../middlewares/Auth';
import * as AuthValidator from '../Validator/UserValidator';
import * as AuthController from '../Controllers/AuthController';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.post('/user/signup', AuthValidator.signup,  AuthController.signup);


export default router;