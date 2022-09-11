import { createUser, findUserbyUsername, findOneUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({username, password});
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
    const findUser = await findOneUser({username,password});
    return findUser
}

