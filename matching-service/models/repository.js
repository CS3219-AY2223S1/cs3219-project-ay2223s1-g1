import Sequelize, { DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

export default sequelize;

try {
    await sequelize.authenticate();
    console.log('Connection to database sqlite3 has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database sqlite3:', error);
}

