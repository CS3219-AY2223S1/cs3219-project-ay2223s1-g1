import { createUser, findUserbyUsername } from './repository.js';

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

export async function ormDeleteUser(username) {
    try {
        const findUser = await findUserbyUsername({username});
        if (findUser) {
            findUser.delete();
            return true;
        } else {
            console.log('ERROR: No user with given username')
            const err = 'ERROR: No user with given username'
            return { err }
        }
        
    } catch (err) {
        console.log('ERROR: Could not delete the user');
        return { err };
    }
}
