import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import Sequelize from 'sequelize';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

// Setup DB Connection with sqlite3
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

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

const httpServer = createServer(app)

httpServer.listen(8001);
console.log('matching-service listening on port 8001');
