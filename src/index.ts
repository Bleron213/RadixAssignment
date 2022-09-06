/**
 * Assignment: Refactor the Radix Assignment Project
 * Author: Bleron Qorri
 * Date: 9/4/2022
 * 
 * Comments:
 * 
 */

import 'reflect-metadata';

import express from 'express';
import bodyParser from 'body-parser';

import initRoutes from './api/routes/init-routes';
import userRoutes from './api/routes/users-routes';

import { ResponseObject } from './models/ResponseObject';
import InitializerService from './services/implementations/InitializerService';
import container from './inversify.config';
import { IInitializerService } from './services/interfaces/IInitializerService';
import TYPES from './util/TYPES';

const initializerService = container.get<IInitializerService>(TYPES.InitializerService);
// Initialize 
initializerService.MigrateTables()
    .then(() => 
    {
        initializerService.SeedUserData()
            .then(() => console.log('Successfully seeded user data'))
            .catch((err: any) => console.log(err))
        console.log('Successfully synced user tables')
    })
    .catch((err: any) => console.log(err))

const app = express();
app.use(bodyParser.json());

app.use('/init', initRoutes)
app.use('/users', userRoutes)

// catch Not found endpoint
app.use((request, response, next) => {
    response.status(404).json(
        {
            message: "Not Found"
        } as ResponseObject
    )
});

export default app;