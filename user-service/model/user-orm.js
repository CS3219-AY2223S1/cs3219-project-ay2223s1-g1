import { createUser, findUserbyUsername, findOneUser } from './repository.js';
import bcrypt from 'bcrypt'

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const hash = bcrypt.hashSync(password, username.length);
        const newUser = await createUser({username:username, password:hash});
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

