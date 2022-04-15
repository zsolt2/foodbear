import { getRepository, Repository} from "typeorm";
import { User } from "../entity/User";
//import { jwt } from "jsonwebtoken";
//import { bcrypt } from "bcrypt";
import { validationResult } from "express-validator";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class AuthController{
    repository = getRepository(User);

    
    // Get all users
    getUsers = async (req, res,next)=>{
        try {
            const users = await this.repository.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    login = async (req, res, next)=>{
        console.log(req.body);
        const email = req.body.email;
        try{
            const user = await this.repository.findOne({where:{email:email}});
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
            console.log("login error" + err);
            res.status(500).json({
                message: err.message
            });
        }
    }

    createUser = async (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    
        const body = req.body;
        body.password = await bcrypt.hash(body.password, 10);
        const user = this.repository.create(body);
    
        try {
            const userInserted = await this.repository.save(user);
            res.json(userInserted);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    getUser = async(req, res)=>{
        const userId = req.user.id;
        try {
            const user = await this.repository.findOne(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
    
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    isAdmin=async (req, res,next)=> {
        const userId = req.user.id;
        console.log("isadmin user id " + userId);
        try {
            const user = await this.repository.findOne(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            console.log('data from db:' + user.isAdmin);
            res.status(200).json(user.isAdmin);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    // Modify user
// router.put('/users', async (req, res) => {
//     const repository = getRepository(User);
//     const user = repository.create(req.body as {});
    
//     try {
//         const existingUser = await repository.findOne(user.id);
//         if (!existingUser) {
//             return res.status(404).json({ message: 'Not existing user.' });
//         }

//         const modifiedUser = await repository.save(user);
//         res.json(modifiedUser);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }

// });
    deleteUser = async(req, res)=>{
        const userId = req.params.id;
        
        try {
            const user = await this.repository.findOne(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'Not existing user.' });
            }
    
            await this.repository.delete(user);
    
            res.status(200).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}