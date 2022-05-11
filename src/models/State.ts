import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Instances/pg';

export interface StateInterfarce extends Model {
    id: number,
    name: string
}

export const State = sequelize.define<StateInterfarce>('State', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    }
},{
    tableName: 'states',
    timestamps: false
})