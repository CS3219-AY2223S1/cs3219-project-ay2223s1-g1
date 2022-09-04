import Sequelize, { DataTypes } from 'sequelize';
//import sequelize from '../index.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

try {
    await sequelize.authenticate();
    console.log('Connection to database sqlite3 has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database sqlite3:', error);
}

export const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    match: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default User;
