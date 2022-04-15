import { User } from "../entity/User";
import { jwt } from "jsonwebtoken";

export function authorize(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        jwt.verify(token, "longersecretisbetter");
        const decodeToken = jwt.decode(token, "longersecretisbetter");
        console.log(decodeToken);
        req.user = new User();
        req.user.id = decodeToken.id;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "No token provided" });
    }
};