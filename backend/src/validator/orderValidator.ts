import { check } from "express-validator";
import { authorizeAdmin } from "../middlewares/admin";

module.exports = [ 
authorizeAdmin,
check('address').not().isEmpty().withMessage('Address must be filled'),
check('address').isLength({ min: 5 }).withMessage('Address must be atleast 5 characters long'),
check('orderTime').isDate().withMessage('Order time must be a date'),
check('deliveryTime').isDate().withMessage('Arrive date must be a date'),
check('name').not().isEmpty().withMessage('Name must be filled'),
]