# API to aplication buy and sell with Nodejs and Typescript
<p>

* [Instalation](#Instalation)
* [TheProject](#the-project)

</p>

# Instalation

### creating project
~~~bash
npm install node 
tsc --init
~~~

### Dependecies

~~~bash 
npm install bcrypt multer mysql2 uuid passport express dotenv express-fileupload express-validator path nodemon jimp pg pg-hstore
~~~

### Dev Dependecies
~~~bash
npm install -D @types/bcrypt @types/cors @types/dotenv @types/express @types/express @types/express-fileupload @types/express-validator @types/jimp @types/multer @types/nodemon @types/passport @types/sequelize  @types/uuid
~~~

<p>This dev dependecies are frameworks or library with support the typescript</p>


# The Project

### Config the server

~~~bash
import express, { Request, Response, ErrorRequestHandler } from "express";
import fileUpload from "express-fileupload";
import passport from "passport";
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './Routes/router';
import path from 'path';
import { MulterError } from 'multer';


dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(fileUpload());

server.use(passport.initialize());

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); //Bad Request
    if (err instanceof MulterError){
        res.json({ error: err.code });
    } else {
        console.log(err);
        res.json({ error: 'Ocorreu algum erro.'});
    }
}

server.use(errorHandler);

server.use('/', apiRouter);

server.use((req: Request, res: Response)=> {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});


server.listen(process.env.PORT);

~~~

### Config database connection with Sequelize

<p>Database used it was postgreSQL</p>

~~~bash

dotenv.config();

export const sequelize = new Sequelize(
    process.env.PG_DB as string,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD as string,
    {
        dialect: 'postgres',
        port: parseInt(process.env.PG_PORT as string)
    }
);

~~~

### Creating the token

~~~bash
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);
~~~

### Use the bcrypt to encrypt password

password = variant catched in request http

~~~bash
const passwordHash = (await bcrypt.hash(password, 10)).toString();
~~~



<p align="center">Made with 💙 by Eduardo Duarte 👽</p>