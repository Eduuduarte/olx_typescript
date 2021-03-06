import { checkSchema } from 'express-validator';

export const signup = checkSchema({
    name: {
        trim: true,
        isLength: {
            options: { min: 2 }
        }, 
        errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Email inválido'
    },
    password: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
    },
    state: {
        notEmpty: true,
        errorMessage: 'Estado não preenchido',
    }
});

export const signin = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Email inválido'
    },
    password: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
    }
});

export const editAction = checkSchema({
    token: {
        notEmpty: true
    },
    name: {
        trim: true,
        isLength: {
            options: { min: 2 }
        }, 
        errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'Email inválido'
    },
    password: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Senha precisa ter pelo menos 2 caracteres'
    },
    state: {
        errorMessage: 'Estado não preenchido',
    }
})