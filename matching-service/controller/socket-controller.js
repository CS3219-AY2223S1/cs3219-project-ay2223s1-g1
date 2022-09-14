import { createUser, deleteUser, findUser, findUserId, numUsers} from '../models/user-orm.js'
import User from '../models/user.js';

async function check_user(id) {
    findUserId(id).then((find_user) => {
        if (find_user == null) {
            console.log('match found');
            clearInterval();
            return id;
        } else {
            console.log('no match');
            return -1;
        }
    });
}

export async function matchUser(id, name, difficulty) {
    try {
        const user_result = findUser(difficulty).then((result) => {
            if (result == null) {
                console.log('creating new user');
                createUser(id, name, difficulty).then((res) => {
                    console.log(res);
                });
                
                return null;
            } else {
                return findUserId(id).then((res) => {
                    if (res == null) {
                        const socket_val = result.id;
                        const match_name = result.name;
                        deleteUser(result.id, difficulty);
                        console.log('match is found');
                        return [match_name, socket_val];
                    } else {
                        console.log('value already exists, still no match is found');
                        return null;
                    }
                });
            }
        });
        return user_result;
        //const match_user = await findUser(difficulty);
        //console.log(match_user);
        /*if (match_user == null) {
            console.log('yo');
            const new_user = await createUser(id, difficulty);
            console.log('hi after');
            const intervalId = setInterval(() => {
                const find_user = findUserId(new_user.id)
                if (find_user != null) {
                  console.log('match found with new user');
                  clearInterval(intervalId);
                  return id;
                }
              }, 30000);
            console.log('hola');
            return null;
        } else {
            const id = match_user.id;
            console.log(id);
            //deleteUser(id, difficulty);
            //console.log('match found with pending user');
            //return id;
        }*/
    } catch (err) {
        console.log(err)
        return -2;
    }
}

export async function deleteUserID(id, difficulty) {
    deleteUser(id, difficulty);
}
