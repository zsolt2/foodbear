import { getRepository } from "typeorm"
import { User } from "../entity/User"

const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../entity/User')
const authorize = require('../middlewares/auth')
const authorizeAdmin = require('../middlewares/admin');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

// Get all users
router.get('/users', authorizeAdmin, async (req, res,next) => {
    const repository = getRepository(User);
    try {
        const users = await repository.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Login 

router.post('/login', async (req, res, next)=>{
    console.log(req.body);
    const email = req.body.email;
    const repository = getRepository(User);
    try{
        const user = await repository.findOne({where:{email:email}});
        if(!user){
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        
        const token = jwt.sign(
            {
            email: user.email,
            id: user.id,
            isAdmin: user.isAdmin
            },'longersecretisbetter',
            {
                expiresIn: '1h'
            });

        res.status(200).json({
            token: token,
            expiresIn: 3600,
            id: user.id,
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

// Create user
router.post('/createuser',[
    authorizeAdmin,
    check('name')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('Name must be atleast 3 characters long'),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('isAdmin','isAdmin should be a boolean').isBoolean(),
    check('password', 'Password should be at least 5 characters characters long')
      .not()
      .isEmpty()
      .isLength({ min: 5}),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const body = req.body;
    const repository = getRepository(User);
    body.password = await bcrypt.hash(body.password, 10);
    const user = repository.create(body);

    try {
        const userInserted = await repository.save(user);
        res.json(userInserted);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// router.get('/users', async (req, res) => {
//     const repository = getRepository(User);

//     try {
//         const users = await repository.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         });
//     }
// });

// get a single user
router.get('/user', authorize,async (req, res) => {
    const repository = getRepository(User);
    const userId = req.user.id;
    try {
        const user = await repository.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// is the user admin
router.get('/user/isadmin', authorize,async (req, res,next) => {
    const userId = req.user.id;
    console.log(userId);
    const repository = getRepository(User);
    try {
        const user = await repository.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        console.log('data from db:' + user.isAdmin);
        res.status(200).json({isAdmin : user.isAdmin});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Modify user
router.put('/users', async (req, res) => {
    const repository = getRepository(User);
    const user = repository.create(req.body as {});
    
    try {
        const existingUser = await repository.findOne(user.id);
        if (!existingUser) {
            return res.status(404).json({ message: 'Not existing user.' });
        }

        const modifiedUser = await repository.save(user);
        res.json(modifiedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Delete user
router.delete('/users/:id',authorizeAdmin, async (req, res) => {
    const userId = req.params.id;
    const repository = getRepository(User);
    
    try {
        const user = await repository.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: 'Not existing user.' });
        }

        await repository.delete(user);

        res.status(200).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Is the token valid
router.get('/token', authorize, async (req, res) => {
    res.status(200).json(true);
});

module.exports = router;