import jwt from 'jsonwebtoken';
import { encryptPassword, comparePassword } from './passwordHelpers';

const WEBTOKEN_SECRET = process.env.WEBTOKEN_SECRET || 'SECRET';

export const generateToken = (userid:any):any =>{
    const token = jwt.sign({userid}, WEBTOKEN_SECRET, {expiresIn:'12h'});
    return token;
}