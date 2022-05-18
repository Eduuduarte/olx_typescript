import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../Instances/pg';

export interface AdsInterface extends Model {
    id: number,
    iduser: number,
    state: string,
    category: string,
    image: string,
    datecreate: Date,
    title: string,
    price: number,
    pricenegotiable: Boolean,
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
    iduser: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    datecreate: {
        type: DataTypes.DATE
    },
    title: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER
    },
    pricenegotiable: {
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
    },
    state: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'ads',
    timestamps:false
})