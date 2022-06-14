import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { State } from '../models/State';

export const editAction = async (email: string, name: string, password: string, state: string, token: string) => {
    
   const user = await User.findOne({where: {token: token}});
    
    let updates: any = {};

    if(email) {
        const emailCheck = await User.findOne({where: {email}});
        if(emailCheck) {
            return 'email existente!';
        }
        updates.email = email;
    }

    if(name) {
        updates.name = name;
    }

    if(password) {
        updates.passwordHash = await bcrypt.hash(password, 10);
    }

    if(state) {
        const checkState = await State.findOne({where: { name: state }});
        if(!checkState) {
            return 'Estado inválido'
        }
        updates.state = state;
    }

    await User.update(updates, {
        where: { token }
    });

    return token;
}