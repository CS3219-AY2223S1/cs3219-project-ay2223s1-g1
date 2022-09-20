import User from './user.js';
import Sequelize, { DataTypes, Op } from 'sequelize';
import sequelize from './repository.js';

export async function createUser(id, name, difficulty) {
    sequelize.sync().then((result) => {
        User.create({
            id: id,
            name: name,
            difficulty: difficulty
        }) 
    });
}

export async function numUsers() {
    User.findAll().then((result) => {
    });
}

export async function findUser(diff) {
    var match = sequelize.sync().then((result) => {
        return User.findOne(
            {
                where: {difficulty: diff}
            });
    });                      
    return match;
}

export async function findUserId(id) {
    var user_check = sequelize.sync().then((result) => {
            return User.findOne({ where: { id: id } });
        }
    );
    return user_check;
}

export async function deleteUser(id, difficulty) {
    await sequelize.sync().then((result) => {
        User.destroy({where: {id: id, difficulty:difficulty}});
    });
}

/*export async function ormMatchUser(difficulty) {
    user_match = await User.findOne({ where: {difficulty: difficulty}});

    if (user_match) {
        id = user_match.id;
        User.destroy({where: {id: id, difficulty:difficulty}});
        return user_match;
    } else {
        createUser(difficulty);
        return null;
    }
}*/

