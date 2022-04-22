import { OrderController } from "../controller/order.controller";
import * as express from "express";
import { authorizeAdmin } from "../middlewares/admin";
import { authorize } from "../middlewares/auth";

const orderValidator = require("../validator/orderValidator");

export function getOrderRoutes(){
    const router = express.Router();
    
    const orderController = new OrderController();

    router.get('/api/order', authorizeAdmin, orderController.getAll);
    router.post('/api/createorder', authorizeAdmin,orderValidator, orderController.create);
    router.get('/api/order/:id', authorize, orderController.getOne); 
    router.delete('/api/order/:id',authorizeAdmin, orderController.delete );
    router.put('/api/order/:id',authorizeAdmin, orderController.update );
    router.get('/api/order/partner/:id', authorize, orderController.getOrdersByPartnerId);

    return router;
}