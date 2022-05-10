import { User } from '../models/User';
import { State } from '../models/State';
import bcrypt from 'bcrypt';

export const createrUser = async (email: string, name: string, password: string, state: string) => {
    const passwordHash = bcrypt.hash(password, 10);
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    let hasUser = await User.findOne({ where: { email }});

    let hasState = await State.findOne({ where: {name: state }});

    if(hasUser){
        return 'Email já cadastrado!'
    }

    if(!hasState) {
        return 'Estado não cadastrado!'
    }

    if(!hasUser && hasState){
        let newUser = await User.create({ name, email, passwordHash, state, token});

        await newUser.save();

        return newUser;
    }



}