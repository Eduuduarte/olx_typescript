import { User } from '../models/User';
import { Category } from '../models/Category';
import { Ads } from '../models/Ads';


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