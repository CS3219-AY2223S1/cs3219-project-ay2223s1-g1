import { 
    ormCreateUser as _createUser , 
    ormFindUserbyUsername as _FindUserbyUsername, 
    ormFindOneUser as _FindOneuser,
    
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
            return res.cookie("accesstoken",accessToken,{httpOnly:false}).status(200).json({message: `Log in is successful!`,accesstoken:accessToken });
        } else {
            return res.status(400).json({message: 'Incorrect username/password!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when trying to log in!'})
    }
}

function verifyAuthHeaderFormat(authHeaderSplit) {
    if (authHeaderSplit.length != 2) {
        throw "Error, HTTP Authorization header has less than 2 elements"
    }
    if (authHeaderSplit[0] != "Bearer") {
        throw "Error, HTTP Authorization header does not have the 'Bearer' type"
    }
    return true
}
function getJWTTokenFromAuthHeader(authHeader) {
    const authHeaderSplit = authHeader.split(" ")
    const authHeaderVerified = verifyAuthHeaderFormat(authHeaderSplit)
    if (!authHeaderVerified) {
        throw "Error, HTTP Authorization header format incorrect"
    }
    return authHeaderSplit[1]
}

export async function logout(req, res) {
    try {
        // Get token from request
        const accessToken = getJWTTokenFromAuthHeader(req.headers.authorization)
        console.log(accessToken)
        if (!accessToken) {
            return res.status(401).json({message: 'Token is missing or invalid!'});
        }
        // Validate token
        console.log("validate")
        // const tokenValid = await validateToken(username, accessToken);
        // if (!tokenValid) {
        //     return res.status(401).json({message: 'Token is missing or invalid!'});
        // }
        // // Blacklist token when user logs out
        // console.log("create blacklist")
        // const resp = await _createBlacklist(accessToken);
        // if (resp.err) {
        //     return res.status(400).json({message: 'Could not blacklist token!'});
        // } else {
        //     console.log(`${username} logged out successfully!`)
        //     return res.status(201).json({message: `${username} logged out successfully!`});
        // }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when logging out!'})
    }
}




