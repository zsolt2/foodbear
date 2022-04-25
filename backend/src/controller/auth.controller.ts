import { getRepository, Repository} from "typeorm";
import { User } from "../entity/User";
import { validationResult } from "express-validator";
import { Controller } from "./base.controller";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class AuthController extends Controller{
    repository = getRepository(User);

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
    
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await this.create( req, res);
    }

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

   
    getOne = async (req, res) => {
        let entityId;
        if(req.params.id){
            entityId = req.params.id;
        } else {
            entityId = req.user.id;
        }
        try {
            const entity = await this.repository.findOne(entityId);
            
            if (!entity) {
                return res.status(404).json({ message: 'Entity not found.' });
            }

            res.json(entity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    delete = async (req, res) => {
        let entityId;
        if(req.params.id){
            entityId = req.params.id;
        } else {
            entityId = req.user.id;
        }

        try {
            const entity = await this.repository.findOne(entityId);
            if (!entity) {
                return res.status(404).json({ message: 'Not existing entity.' });
            }

            await this.repository.delete(entity);
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
    
}