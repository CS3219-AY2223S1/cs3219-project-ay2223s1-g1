import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
import { createUser, signIn ,logout} from './controller/user-controller.js';

const router = express.Router()

// Controller will contain all the User-defined Routes
router.post('/signin', signIn)
router.post('/signup', createUser)
router.post('/logout', logout)

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'));