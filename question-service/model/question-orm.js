
import {
    createQuestion,
    deleteQuestion,
    getAllQuestion,
    getRandomQuestionFromDifficulty

} from "./repository.js";

export async function ormCreateQuestion(title, difficulty, question) {
    try {
        const newQuestion = await createQuestion({title, difficulty, question });
        newQuestion.save();
        return true;
    } catch (err) {
        console.log("ERROR: Could not create new question");
        return { err };
    }
}

export async function ormDeleteQuestion(id) {
    try {
        await deleteQuestion({id});
        return true;
    } catch (err) {
        console.log("ERROR: could not delete question");
        return { err };
    }
}

export async function ormGetRandomQuestionFromDifficulty(difficulty) {
    try {
        const question = await getRandomQuestionFromDifficulty(difficulty);
        return { question };
    } catch (err) {
        console.log("ERROR: could no retrieve question");
        return { err }
    }
}

export async function ormGetAllQuestion() {
    try {
        const question = await getAllQuestion();
        return { question };
    } catch (err) {
        console.log("ERROR: could no retrieve question");
        return { err }
    }
}