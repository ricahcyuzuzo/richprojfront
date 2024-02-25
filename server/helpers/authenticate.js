import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (user) => {
    return jwt.sign({ user }, 'alms23333', { expiresIn: '30d' });
}

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}
