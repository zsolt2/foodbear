import { PartnerController } from "../controller/partner.controller";
import * as express from "express";
import { authorizeAdmin } from "../middlewares/admin";
import { authorize } from "../middlewares/auth";

const partnerValidator = require("../validator/partnerValidator");

export function getRoutes(){
    const router = express.Router();
    
    const partnerController = new PartnerController();

    router.get('/api/partner', authorizeAdmin, partnerController.getAll);
    router.post('/api/createpartner', partnerValidator, partnerController.create);
    router.get('/api/partner/:id', authorize, partnerController.getOne); 
    router.delete('/api/partner/:id',authorizeAdmin, partnerController.delete );
    router.put('/api/partner/:id',authorizeAdmin, partnerController.update );

    return router;
}