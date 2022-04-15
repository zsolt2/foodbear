import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
//const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
import { connectionOptions } from "../ormconfig";
import { getAuthRoutes } from "./routes/auth.routes";
import { getPartnerRoutes } from "./routes/parter.routes";
import { getFoodRoutes } from "./routes/food.routes";

createConnection(connectionOptions).then(async connection => {

    //const api = require('./routes/auth.routes')

    // Express settings
    const app = express()
    app.use(express.json())
    // app.use(
    // bodyParser.urlencoded({
    //     extended: false,
    // }),
    // )
    app.use(cors())

    // Serve static resources
    //app.use('/public', express.static('public'))
    app.use(getAuthRoutes());
    app.use(getPartnerRoutes());
    app.use(getFoodRoutes());

    // Express error handling
    // app.use((req, res, next) => {
    //     setImmediate(() => {
    //     next(new Error('Something went wrong'))
    //     })
    // })
    
    app.use(function (err, req, res, next) {
        console.error(err.message)
        if (!err.statusCode) err.statusCode = 500
        res.status(err.statusCode).send(err.message)
    })
  
    app.listen(3000, () => {
        console.log('Server listening on :3000 ...');
    });

}).catch(error => console.log( "index error" + error));