import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Instances/pg';

export interface CategoryInterface extends Model {
    id: number,
    name: string,
    slug: string
}

export const Category = sequelize.define<CategoryInterface>('Category', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'category',
    timestamps: false
})
