import Mongoose from 'mongoose';
import User from '../models/db/Users.model';
import { validateLogin, validateSignUp } from '../helpers/validations/auth.validation';
import { createUser, loginUser } from '../models/body/signup.body';
import { comparePassword, generateToken, hashPassword } from '../helpers/authenticate';

export const signup = async (req, res) => {    
    try {
        const { email, name, password } = req.body;
        const { error } = validateSignUp(createUser(req));

        if(error){
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, '')
            })
        }

        const results = await User.find({ email });

        if(results.length > 0) {
            return res.status(409).json({
                message: 'Mobile phone number is already used, please try another',
            })
        }

        const hashedPassword = hashPassword(password);
        const created = await User.create({
            _id: new Mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword,
            role: 'staff',
        })
        if(created){
            return res.status(201).json({
                message: 'User Created successfully',
                token: generateToken(created),
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = validateLogin(loginUser(req));

        if(error){
            return res.status(400).json({
                message: error.details[0].message.replace(/"/g, '')
            })
        }

        const results = await User.findOne({ email });

        if(!results){
            return res.status(401).json({
                message: 'Invalid phone number or password',
            });
        };

        if(results.status === 'deactivated'){
            return res.status(401).json({
                message: 'Your Account is Suspended, please contact the support team for help.',
            });
        }

        const isPasswordTrue = comparePassword(password, results.password);
        if(!isPasswordTrue){
            return res.status(401).json({
                message: 'Invalid username or password',
            });
        }

        return res.status(201).json({
            token: generateToken(results)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}
