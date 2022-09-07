import User from './user.js';
import Container from './container.js';

export async function createUser(id, difficulty) {
    const new_user = User.create({
        id: id,
        difficulty: difficulty
    }).catch(err => {
        console.log(err);
    });
    return new_user;
}

export async function deleteUser(id, difficulty) {
    User.destroy({where: {id: id, difficulty:difficulty}});
}

export async function ormMatchUser(difficulty) {
    user_match = await User.findOne({ where: {difficulty: difficulty}});

    if (user_match) {
        id = user_match.id;
        User.destroy({where: {id: id, difficulty:difficulty}});
        return user_match;
    } else {
        createUser(difficulty);
    }
}

