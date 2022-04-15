import { check } from "express-validator";
import { authorizeAdmin } from "../middlewares/admin";

module.exports = [ 
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
.isLength({ min: 8})
]