import { createUser, deleteUser} from '../model/user-orm.js'
import User from '../models/user.js';

export async function matchUser(id, difficulty) {
    try {
        match_user = User.findOne({ where: { difficulty: difficulty } });
        if (matchUser == null) {
            new_user = createUser(id, difficulty);

            const intervalId = setInterval(() => {
                find_user = await User.findOne({ where: { id: id } })
                if (find_user != null) {
                  console.log('match found with new user');
                  clearInterval(intervalId);
                  return id;
                }
              }, 30000);

            return null;
        } else {
            id = match_user.id;
            deleteUser(id, difficulty);
            console.log('match found with pending user');
            return id;
        }
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}