import { check } from "express-validator";
import { authorizeAdmin } from "../middlewares/admin";

module.exports = [ 
authorizeAdmin,
check('name')
.not()
.isEmpty()
.isLength({ min: 3 })
.withMessage('Name must be atleast 3 characters long'),
check('tel').not().isEmpty().withMessage('Tel must be filled'),
check('tel').isMobilePhone('hu-HU').withMessage('Tel must be a valid phone number'),
check('taxNumber').not().isEmpty().withMessage('Tax number must be filled'),
check('taxNumber').isNumeric().withMessage('Tax number must be a number'),
check('taxNumber').isLength({ min: 11, max: 11 }).withMessage('Tax number must be 11 digits long'),
check('adress').not().isEmpty().withMessage('Adress must be filled'),
check('adress').isLength({ min: 5}).withMessage('Adress must be atleast 5 characters long')
]