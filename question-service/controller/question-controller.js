import {
    ormCreateQuestion as _createQuestion,
    ormGetAllQuestion as _getAllQuestion,
    ormDeleteQuestion as _deleteQuestion,
    ormGetRandomQuestionFromDifficulty as _getRandomQuestionFromDifficulty
} from "../model/question-orm.js";

export async function getRandomQuestionFromDifficulty(req, res) {
    try {
        const { difficulty } = req.params;
        if (difficulty) {
            const resp = await _getRandomQuestionFromDifficulty(difficulty);
            if(resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not retrieve Question"});
            } else {
                console.log(`retrieved question ${difficulty} successfully!`);
                return res
                    .status(200)
                    .json(
                     resp.question
                    );
            }
        } else {
            return res
                .status(400)
                .json({ message: "Difficulty is missing" })
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when retrieving queston" });
    }
}

export async function getAllQuestion(req, res) {
    try {
        const resp = await _getAllQuestion();
        if(resp.err) {
            return res
                .status(400)
                .json({ message: "Could not retrieve Question"});
        } else {
            return res
                .status(200)
                .json(
                    resp.question
                );
            }

    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ message: "Database failure when retrieving queston" });
    }
}

export async function createQuestion(req, res) {
    try {
        const { title, difficulty, question } = req.body;
        if (title, difficulty && question) {
            const resp = await _createQuestion(title, difficulty, question);
            console.log(resp);
            if(resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not create question"});
            } else {
                console.log(`Created new question difficulty: ${difficulty} successfully!`);
                return res
                    .status(201)
                    .json({ message: `Created new question difficulty: ${difficulty} successfully!`});
            }
        } else {
            return res
                .status(400)
                .json({ message: "Difficulty and/or Question are missing!"});
        }
    } catch (err) {
        return res
            .status(500)
            .json({message: "Database failure when creating new question!" });
    }
}


export async function deleteQuestion(req, res) {
    try {
        const { question_id } = req.params;
        if (question_id) {
            console.log(question_id)
            const resp = await _deleteQuestion(question_id);
            console.log(resp);
            if(resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not delete question"});
            } else {
                console.log("Question deleted successfully!");
                return res
                    .status(200)
                    .json({ message: "Question deleted successfully!"});
            }
        } else {
            return res
                .status(400)
                .json({ message: "Id is missing!"})
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when deleting question!"});
    }
}