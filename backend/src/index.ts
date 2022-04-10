import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {User} from "./entity/User";
import * as express from "express";
import { connectionOptions } from "../ormconfig";

createConnection(connectionOptions).then(async connection => {

    const app = express();

    app.use(express.json());

    app.get('/api/users', async (req, res) => {
        const repository = getRepository(User);

        try {
            const users = await repository.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });

    app.post('/api/users', async (req, res) => {
        const body = req.body;
        const repository = getRepository(User);
        const user = repository.create(body);

        try {
            const userInserted = await repository.save(user);
            res.json(userInserted);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });

    app.get('/api/users', async (req, res) => {
        const repository = getRepository(User);

        try {
            const users = await repository.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });

    app.get('/api/users/:id', async (req, res) => {
        const userId = req.params.id;
        const repository = getRepository(User);

        try {
            const user = await repository.findOne(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    });

    app.put('/api/users', async (req, res) => {
        const repository = getRepository(User);
        const user = repository.create(req.body as {});

        try {
            const existingUser = await repository.findOne(user.id);
            if (!existingUser) {
                return res.status(404).json({ message: 'Not existing user.' });
            }

            const modifiedUser = await repository.save(user);
            res.json(modifiedUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    });

    app.delete('/api/users/:id', async (req, res) => {
        const userId = req.params.id;
        const repository = getRepository(User);

        try {
            const user = await repository.findOne(userId);

            if (!user) {
                return res.status(404).json({ message: 'Not existing user.' });
            }

            await repository.delete(user);

            res.status(200).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.listen(3000, () => {
        console.log('Server listening on :3000 ...');
    });

}).catch(error => console.log(error));