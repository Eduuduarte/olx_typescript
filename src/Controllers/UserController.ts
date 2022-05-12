import { Request, Response } from 'express';
import { State } from '../models/State';
import { Ads } from '../models/Ads';
import { User } from '../models/User';
import { Category } from '../models/Category';

export const getStates = async (req: Request, res: Response) => {
    let state = await State.findAll();

    res.json({state});
}

export const info = async (req: Request, res: Response) => {
    let token = req.query.token;

    const user = await User.findOne({ where: {token}});
    const state = await State.findOne({where: {name: user?.state}});
    const ads = await Ads.findAll({where: {iduser: user?.id}});

    res.json({state});
}

export const editInfo = async (req: Request, res: Response) => {

}
