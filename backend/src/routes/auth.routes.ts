import { AuthController } from "../controller/auth.controller"
import * as express from "express";
import { check } from "express-validator";
import { authorizeAdmin } from "../middlewares/admin";
import { authorize } from "../middlewares/auth";

export function getRoutes(){
    const router = express.Router();
    
    const authController = new AuthController();

    router.get('/api/users', authorizeAdmin, authController.getUsers);
    router.post('/api/login', authController.login);
    router.post('/api/createuser',[
        authorizeAdmin,
        check('name')
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Name must be atleast 3 characters long'),
        check('email', 'Email is not valid').not().isEmpty().isEmail(),
        check('isAdmin','isAdmin should be a boolean').isBoolean(),
        check('password', 'Password should be at least 8 characters characters long')
        .not()
        .isEmpty()
        .isLength({ min: 8}),
    ], authController.createUser);
    router.get('/api/user', authorize, authController.getUser); 
    router.get('/api/user/isadmin', authorize, authController.isAdmin);
    router.delete('/api/users/:id',authorizeAdmin, authController.deleteUser );
    router.get('/api/token', authorize, async (req, res) => {
        res.status(200).json(true);
    });

    return router;
}
