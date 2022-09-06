import { createUser } from './repository.js';
import bcrypt from 'bcrypt';
//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await createUser({username:username, password:hash});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

