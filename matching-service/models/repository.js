import Sequelize from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

export default sequelize;

try {
    await sequelize.authenticate();
    console.log('Successfully established connection to database sqlite3');
} catch (error) {
    console.error('Unable to connect to the database sqlite3:', error);
}

