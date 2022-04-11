import { getRepository } from "typeorm"
import { User } from "../entity/User"

const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../entity/User')
const authorize = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

router.get('/hello',(req,res,next)=>{
    console.log(req+'hello');
    res.send('helloka');
});

router.get('/',(req,res,next)=>{
    res.send('hello');
});

router.get('/users', async (req, res,next) => {
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

router.post('/users', async (req, res) => {
    const body = req.body;
    const repository = getRepository(User);
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

router.get('/users', async (req, res) => {
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

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const repository = getRepository(User);

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

router.delete('/users/:id', async (req, res) => {
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



module.exports = router;