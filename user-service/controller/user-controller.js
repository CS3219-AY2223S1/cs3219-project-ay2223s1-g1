import { 
    ormCreateUser as _createUser , 
    ormFindUserbyUsername as _FindUserbyUsername, 
    ormFindOneUser as _FindOneuser,
    ormAddBlacklist as _addBlackList,
    hashPassword,
    validatePassword
    
} from '../model/user-orm.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET , REFRESH_ACCESS_TOKEN_SECRET} from '../constants/constants.js';

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
            const refreshToken = jwt.sign({username:username},REFRESH_ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
            user.refreshToken = refreshToken
            user.save()
            //refresh token in cookie
            //access token in data
            if(validatePassword(password, user.password)){
                res.cookie("refreshtoken",refreshToken,{httpOnly:true})
                return res.status(200).json({message: `Log in is successful!`,accesstoken:accessToken });
            }  else {
                return res.status(400).json({message: 'Incorrect username/password!'});
            }
            
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
        const accessToken = req.accessToken
        if (!accessToken) {
            return res.status(401).json({message: 'Token is missing!'});
        }
        const resp = await _addBlackList(accessToken);
        if (resp.err) {
            return res.status(500).json({message: 'Unable to add to blacklist'});
        } else {
            return res.status(200).json({ message: "User logout is successful" })
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when logging out!'})
    }
}

export async function updateUser(req, res) {
    try {
        const { username } = req.user
        const resp = await _FindUserbyUsername(username)
        if (resp.err) {
            logger.error(resp.err)
            return res.status(400).json({ message: "Could not get user info" })
        }
        const user = resp[0]
        if(!(req.body?.oldPassword && req.body?.newPassword)){
            return res.status(400).json({ message: "Could not get password info" })
        }
        if (req.body.oldPassword === req.body.newPassword) {
                return res.status(400).json({ message: "Previous password and updated password cannot be the same" })
                
            }
        if(!validatePassword(req.body.oldPassword, user.password)){
                return res.status(400).json({message: 'Incorrect old password!'});
            }
        user.password = hashPassword(req.body.newPassword,username)
        user.save()
        return res.status(200).json({ message: "Update user info successfully"})
        
               
    } catch (err) {
        return res.status(500).json({ message: "Database failure when updating user" })
    }
}



