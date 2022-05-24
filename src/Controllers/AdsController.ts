import { Request, Response } from 'express';

import { Category } from '../models/Category';

import * as AdService from '../Service/AdService';

import { addImage } from '../functions/image'
import { NUMBER } from 'sequelize';


export const getCategories = async (req: Request, res: Response) => {
    const cat = await Category.findAll();

    let category: any = [];

    for( let i in cat) {
        category.push({
            id: cat[i].id,
            name: cat[i].name,
            slug: cat[i].slug,
            img: `${process.env.BASE}/assets/images/${cat[i].slug}.png`            
        })
    }

    res.json({category});
}

export const addAction = async (req: Request, res: Response) => {
    let { title, price, priceneg, desc, cat, token } = req.body;

    const file = req.files;

    const newAd = await AdService.addAd(title, price, priceneg, desc, cat, token);

    res.json({newAd, file});
}

export const getList = async (req: Request, res: Response) => {
    let {sort = "asc", offset = 0, limit = 8, q, cat, state } = req.query;
    let filters = {status: true};
    let total = 0;

    const list = await AdService.catchList(
        sort as string, 
        offset as number, 
        limit as number, 
        q as string, 
        cat as string, 
        state as string
    );

    res.json({list, cat});

}


export const getItem = async (req: Request, res: Response) => {

}

export const editAction = async (req: Request, res: Response) => {

}