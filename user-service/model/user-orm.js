import { createUser, findUserbyUsername, findOneUser , checkBlackList, createBlackList} from './repository.js';
import bcrypt from 'bcrypt'

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password, checked) {
    try {
        const hash = hashPassword(password,username);
        const newUser = await createUser({username:username, password:hash, admin:checked});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormFindUserbyUsername(username) {
    const findUser = await findUserbyUsername({username});
    return findUser
}

export async function ormFindOneUser(username,password) {
    const hash = bcrypt.hashSync(password, username.length);
    const findUser = await findOneUser({username,hash});
    return findUser
}

export async function ormAddBlacklist(token) {
    try {
        if(!await checkBlackList(token)){
            const newBlacklist = await createBlackList({token:token, createdAt: Date.now()});
            newBlacklist.save();
            return true;
        }
    } catch (err) {
        console.log('ERROR: Could not add to blacklist!');
        return { err };
    }
}

export function hashPassword(password,username) {
    const hash = bcrypt.hashSync(password, username.length);
    return hash
}
export function validatePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}