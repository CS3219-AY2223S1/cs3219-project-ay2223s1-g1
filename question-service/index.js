import express from 'express';
import cors from 'cors';
import {
    createQuestion,
    getAllQuestion,
    deleteQuestion,
    getRandomQuestionFromDifficulty
} from './controller/question-controller.js';

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions)) // config cors so that front-end can use 
const router = express.Router()
app.options('*', cors())
// Controller will contain all the User-defined Routes

app.get('/', (req, res) => {
    res.send('Hello World from question-service');
});

router.get("/", getAllQuestion);
router.post("/", createQuestion);
router.delete("/:question_id", deleteQuestion);
router.get("/:difficulty", getRandomQuestionFromDifficulty);

app.use('/api/question', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8050, () => console.log('question-service listening on port 8050'))