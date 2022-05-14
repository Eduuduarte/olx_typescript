import { Request, Response } from 'express';

import { Category } from '../models/Category';


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

}

export const getList = async (req: Request, res: Response) => {

}

export const getItem = async (req: Request, res: Response) => {

}

export const editAction = async (req: Request, res: Response) => {

}