import { User } from '../models/User';
import { Category } from '../models/Category';
import { Ads } from '../models/Ads';
import { Op, where } from 'sequelize';

interface ADS {
    title: string,
    price: string,
    pricenegotiable: string
}

export const addAd = async (title: string, price: string, priceneg: string, desc: string, cat: string, token: string) => {

    const user = await User.findOne({where: {token}});

    if(!title || !cat) {
        return {error: 'Título e/ou categoria não foram preenchidos'};
    }

    const category = await Category.findByPk(parseInt(cat));
    if(!category) {
        return {error: 'Categoria não existe'};
    }

    let priceN: number;

    if(price) {
        price = price.replace('.', '').replace(',', '.').replace('R$ ', '');
        priceN = parseFloat(price);
    } else {
        priceN = 0;
    }

    const newAd = new Ads();
    newAd.status = "true";
    newAd.iduser = user?.id as number;
    newAd.state = user?.state as string;
    newAd.datecreate = new Date();
    newAd.title = title;
    newAd.category = cat;
    newAd.price = priceN;
    newAd.pricenegotiable = (priceneg == 'true') ? true : false;
    newAd.description = desc;
    newAd.views = 0;

    const info = await newAd.save();

    return info;

}

export const catchList = async (sort: string, offset: number, limit: number, q: string, cat: string, state: string ) => {
    const filters: any = {}

    if(q) {
        filters.title = {'$regex': q, '$options': 'i'}
    }

    if(cat) {
        const category = await Category.findOne({where: {id: cat}});
        if(category){
            filters.category = parseInt(cat);
        }
    }
    
    console.log(filters)
    const adList = await Ads.findAll({
        where: {
            filters
        }
    });

    return adList;
}

export const takeItem = async (id: string) => {
    let item = await Ads.findByPk(id);

    if(!item) {
        return "Produto inexistente!";
    }

    item.views++;
    await item.save();

    let category = await Category.findByPk(item.category);
    let userInfo = await User.findByPk(item.iduser);

    return {
        id: item.id,
        title: item.title,
        price: item.price,
        category,
        description: item.description,
        views: item.views,
        state: item.state
    }
}

export const edit = async (id: string, title: string, status: string, price: string, pricenegotiable: string, desc: string, cat: string, images: string, token: string) => {
    
    const ad = await Ads.findByPk(id);
   
    if(!ad) {
        return "Anúncio inexistente!";
    }

    const user = await User.findOne({where: {token}});
    if(user?.id !== ad.iduser) {
        return "Este anúncio não pertence a esse usuário!"
    }

    let updates: Partial<ADS> = {}

    if(title) {
        updates.title = title
    }

    if(price) {
        updates.price = price;
    }

    if(pricenegotiable) {
        updates.pricenegotiable = pricenegotiable;
    }


    ad.update(updates, {where: {id}});

    return updates;

}