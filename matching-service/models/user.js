import { DataTypes } from 'sequelize';
import sequelize from './repository.js';

const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:false
    }
});

export default User;
