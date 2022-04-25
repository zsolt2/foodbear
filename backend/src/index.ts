import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
const cors = require('cors')
const bodyParser = require('body-parser')
import { connectionOptions } from "../ormconfig";
import { getAuthRoutes } from "./routes/auth.routes";
import { getPartnerRoutes } from "./routes/parter.routes";
import { getFoodRoutes } from "./routes/food.routes";
import { getOrderRoutes } from "./routes/order.routes";
import { getCourierRoutes } from "./routes/courier.routes";




createConnection(connectionOptions).then(async connection => {

    // Express settings
    const app = express()
     app.use(cors())
     app.use(express.json());

    // Serve static resources
    app.use(getAuthRoutes());
    app.use(getPartnerRoutes());
    app.use(getFoodRoutes());
    app.use(getOrderRoutes());
    app.use(getCourierRoutes());

    //fill();

    //Express error handling
    app.use((req, res, next) => {
        setImmediate(() => {
        next(new Error('Something went wrong'))
        })
    })

    app.use(function (err, req, res, next) {
        console.error(err.message)
        if (!err.statusCode) err.statusCode = 500
        res.status(err.statusCode).send(err.message)
    })
  
    app.listen(3001, () => {
        console.log('Server listening on :3001 ...');
    });

}).catch(error => console.log( "index error" + error));

