import { check } from "express-validator";
import { authorizeAdmin } from "../middlewares/admin";

module.exports = [ 
authorizeAdmin,
check('name')
.not()
.isEmpty()
.isLength({ min: 3 })
.withMessage('Name must be atleast 3 characters long'),
check('price').not().isEmpty().withMessage('Price must be filled'),
check('price').isNumeric().withMessage('Price must be a number'),
check('price').isInt({min: 0}).withMessage('Price must be a positive number'),
check('imageUrl').isURL().withMessage('Image url must be a valid url'),
]