import { User } from "../entity/User";

const jwt = require("jsonwebtoken");

export function authorizeAdmin(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        jwt.verify(token, "longersecretisbetter");
        const decodeToken = jwt.decode(token, "longersecretisbetter");
        req.user = new User();
        req.user.id = decodeToken.id;
        req.user.isAdmin = decodeToken.isAdmin;
        if(decodeToken.isAdmin == true){
            next();
        }else{
            res.status(401).json({ message: "Not admin" });
        }
    } catch (error) {
        console.log("authorize admin error" + error.message);
        res.status(401).json({ message: "No token provided" });
    }
};