import { check } from "express-validator";
import { authorizeAdmin } from "../middlewares/admin";

module.exports = [ 
authorizeAdmin,
check('name')
.not()
.isEmpty()
.isLength({ min: 3 })
.withMessage('Name must be atleast 3 characters long'),
check('capacity').not().isEmpty().withMessage('Capacity must be filled'),
check('capacity').isNumeric().withMessage('Capacity must be a number'),
check('capacity').isInt({min: 1}).withMessage('Capacity must be a positive number'),
check('isAvailable').not().isEmpty().withMessage('Is available must be filled'),
check('isAvailable').isBoolean().withMessage('Is available must be a boolean'),
]