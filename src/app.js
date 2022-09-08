import express from 'express';
import routes from './routes';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

class App{

    constructor(){
        this.server = express();

        mongoose.connect('mongodb+srv://devhouse:devhouse321@devhouse.rhryh5n.mongodb.net/devhouse?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());

        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );

        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;