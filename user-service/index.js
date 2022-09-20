import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createUser, signIn, logout, updateUser, deleteUser} from './controller/user-controller.js';
import { authenticateToken } from './middleware.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions)) // config cors so that front-end can use
app.use(cookieParser())
app.options('*', cors())

const router = express.Router()

// Controller will contain all the User-defined Routes
router.post('/signin', signIn)
router.post('/signup', createUser)
router.post('/logout', authenticateToken, logout)
router.put('/', authenticateToken, updateUser)
router.delete('/', authenticateToken, deleteUser)

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'));