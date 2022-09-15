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
            const accessToken = jwt.sign({username:username},ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
            return res.cookie("accesstoken",accessToken,{httpOnly:true}).status(200).json({message: `Log in is successful!`,accesstoken:accessToken });
        } else {
            return res.status(400).json({message: 'Incorrect username/password!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when trying to log in!'})
    }
}

export async function logout(req, res) {
    try {
        // Get token from request
        console.log("attempting to logout")
        const token = getTokenFrom(req);
        if (!token) {
            return res.status(401).json({message: 'Token is missing or invalid!'});
        }
        // Validate token
        const tokenValid = await validateToken(username, token);
        if (!tokenValid) {
            return res.status(401).json({message: 'Token is missing or invalid!'});
        }
        // Blacklist token when user logs out
        const resp = await _createBlacklist(token);
        if (resp.err) {
            return res.status(400).json({message: 'Could not blacklist token!'});
        } else {
            console.log(`${username} logged out successfully!`)
            return res.status(201).json({message: `${username} logged out successfully!`});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when logging out!'})
    }
}

// Validate JWT token
const validateToken = async (username, token) => {
    try {
        // Check if token is blacklisted
        const tokenBlacklisted = await _checkTokenBlacklist(token);
        if (tokenBlacklisted) {
            console.log("Token is blacklisted");
            return false;
        }
        // Check if token is valid
        const decodedToken = jwt.verify(token, process.env.SECRET);
        return (decodedToken.username === username) ? true : false;
    } catch (err) {
        console.log('ERROR: Could not verify token');
    }
}

// Get JWT token from request
const getTokenFrom = (req) => {
    try {
        const authorization = req.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
          return authorization.substring(7)
        }
        return null
    } catch (err) {
        console.log('ERROR: Could not read token');
    }
}