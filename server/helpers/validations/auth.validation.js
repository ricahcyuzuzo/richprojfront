import Hapi from '@hapi/joi';

export const validateSignUp = (user) => {
    const schema = Hapi.object().keys({
        name: Hapi.string().min(2).required(),
        email: Hapi.string().email().required(),
        password: Hapi.string().min(8).required(),
    })

    return schema.validate(user);
}

export const validateLogin = (user) => {
    const schema = Hapi.object().keys({
        email: Hapi.string().email().required(),
        password: Hapi.string().required(),
    })

    return schema.validate(user);
}
