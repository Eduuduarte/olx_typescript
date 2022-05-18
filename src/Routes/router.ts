import { Router } from "express";
import * as Auth from '../middlewares/Auth';
import * as AuthValidator from '../Validator/UserValidator';
import * as AuthController from '../Controllers/AuthController';
import * as UserController from '../Controllers/UserController';
import * as AdsController from '../Controllers/AdsController';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});


router.get('/states', UserController.getStates);

router.post('/user/signup', AuthValidator.signup,  AuthController.signup);
router.post('/user/signin', AuthValidator.signin, AuthController.signin);

router.get('/user/me', Auth.privateAuth, UserController.info);
router.put('/user/me', AuthValidator.editAction, Auth.privateAuth, UserController.editInfo);

router.get('/categories', AdsController.getCategories);

router.post('/ad/add', Auth.privateAuth, AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdsController.getItem);
router.post('/ad/:id', Auth.privateAuth, AdsController.editAction);



export default router;