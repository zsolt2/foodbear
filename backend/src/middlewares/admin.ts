import { User } from "../entity/User";

const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        jwt.verify(token, "longersecretisbetter");
        const decodeToken = jwt.decode(token, "longersecretisbetter");
        console.log(decodeToken);
        if(decodeToken.isAdmin == true){
            next();
        }else{
            res.status(404).json({ message: "Not admin" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "No token provided" });
    }
};