import Sequelize, { DataTypes } from 'sequelize';
import sequelize from './repository.js';

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default User;
