export const createUser = (req) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    return user;
}

export const loginUser = (req) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    return user;
}