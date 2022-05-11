import {Request, Response} from 'express';
import { validationResult, matchedData } from 'express-validator';
import * as AuthService from '../Service/AuthService';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({ error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    const newUser = await AuthService.createrUser(data.email, data.name, data.password, data.state);

    res.status(201);
    res.json({newUser, success: true, data});
}

export const signin = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({ error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    const email = data.email;

    const login = await AuthService.loginUser(data.email, data.password);

    res.status(201);
    res.json({ login, email });
}