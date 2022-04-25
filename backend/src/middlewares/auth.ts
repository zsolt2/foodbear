import { User } from "../entity/User";
import { secret } from "../secret";

const jwt = require("jsonwebtoken");

export function authorize(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        jwt.verify(token, secret);
        const decodeToken = jwt.decode(token, secret);
        req.user = new User();
        req.user.id = decodeToken.id;
        req.user.isAdmin = decodeToken.isAdmin;
        next();
    } catch (error) {
        console.log("authorize error" + error.message);
        res.status(401).json({ message: "No token provided" });
    }
};