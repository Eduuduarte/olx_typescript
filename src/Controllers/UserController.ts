import { Request, Response } from 'express';
import { State } from '../models/State';
import { Ads } from '../models/Ads';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { validationResult, matchedData } from 'express-validator';
import * as UserService from '../Service/UserService';

export const getStates = async (req: Request, res: Response) => {
    let state = await State.findAll();

    res.json({state});
}

export const info = async (req: Request, res: Response) => {
    let token = req.query.token;

    const user = await User.findOne({ where: {token}});
    const state = await State.findOne({where: {name: user?.state}});
    const ads = await Ads.findAll({where: {iduser: user?.id}});

    let adList = [];

    for(let i in ads) {

        const cat = await Category.findOne({where: {name: ads[i].category}});

        adList.push({
            id: ads[i].id,
            status: ads[i].status,
            images: ads[i].image,
            category: cat?.slug
        });
    }

    res.json({
        name: user?.name,
        email: user?.email,
        state: state?.name,
        ads: adList
    });
}

export const editInfo = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({ error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    const updateUser = await UserService.editAction(data.email, data.name, data.password, data.state, data.token);
    res.status(200);
    res.json({updateUser});

}
