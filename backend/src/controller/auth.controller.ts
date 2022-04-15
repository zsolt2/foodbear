import { getRepository, Repository} from "typeorm";
import { User } from "../entity/User";
import { jwt } from "jsonwebtoken";
import { bcrypt } from "bcrypt";
import { validationResult } from "express-validator";

export class AuthController{
    repository=getRepository(User);

    
    // Get all users
    async getUsers (req, res,next){
        try {
            const users = await this.repository.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    async login (req, res, next){
        console.log(req.body);
        const email = req.body.email;
        try{
            const user = await this.repository.findOne({where:{email:email}});
            if(!user){
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }
            const passwordIsValid = bcrypt.compareSync(req.body.password, req.body.password);
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
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        }
    }

    async createUser (req, res){
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

    async getUser (req, res){
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

    async isAdmin (req, res,next) {
        const userId = req.user.id;
        console.log(userId);
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
    async deleteUser(req, res){
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