import { 
    ormCreateUser as _createUser , 
    ormFindUserbyUsername as _FindUserbyUsername, 
    ormFindOneUser as _FindOneuser
} from '../model/user-orm.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constants/constants.js';

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const duplicate = await _FindUserbyUsername(username)
        if (duplicate.length>0){
            return res.status(409).json({message: 'Duplicate username!'});}
        if (username && password) {
            const resp = await _createUser(username, password);
            console.log(resp);
            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new user!'});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: `Created new user ${username} successfully!`});
            }
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function signIn(req, res) {
    try {
        const { username, password } = req.body;
        const user = await _FindOneuser(username,password)
        if (user) {
            const accessToken = jwt.sign({username:username},ACCESS_TOKEN_SECRET)
            console.log(accessToken)
            // res.json({accessToken:accessToken})
            res.cookie("accesstoken",accessToken,{httpOnly:true})
            return res.status(200).json({message: `Log in is successful!`,accesstoken:accessToken });
        } else {
            return res.status(400).json({message: 'Incorrect username/password!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when trying to log in!'})
    }
}
