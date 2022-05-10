import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../Instances/pg';

export interface AdsInterface extends Model {
    id: number,
    idUser: number,
    category: string,
    image: [object],
    dateCreate: Date,
    title: string,
    price: number,
    priceNegotiable: Boolean,
    description: string,
    views: number,
    status: string
}

export const Ads = sequelize.define<AdsInterface>('Ads', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idUser: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    dateCreate: {
        type: DataTypes.DATE
    },
    title: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER
    },
    priceNegotiable: {
        type: DataTypes.BOOLEAN
    },
    description: {
        type: DataTypes.STRING
    },
    views: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    }
})