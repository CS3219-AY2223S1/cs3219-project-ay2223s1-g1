import { createUser, deleteUser, findUser, findUserId } from '../models/user-orm.js'

export async function matchUser(id, name, difficulty) {
    try {
        const user_result = findUser(difficulty).then((result) => {
            if (result == null) {
                createUser(id, name, difficulty).then((res) => {
                    console.log("Creating new user in matching service - ", res);
                });
                return null;
            } else {
                return findUserId(id).then((res) => {
                    if (res == null) {
                        const socket_val = result.id;
                        const match_name = result.name;
                        deleteUser(result.id, difficulty);
                        console.log('Match for ', name, ' is ', match_name);
                        return [match_name, socket_val];
                    } else {
                        console.log('Unable to find match for user');
                        return null;
                    }
                });
            }
        });
        return user_result;
    } catch (err) {
        return [-1, err];
    }
}

export async function deleteUserID(id, difficulty) {
    deleteUser(id, difficulty);
}
