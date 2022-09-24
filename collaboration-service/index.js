import collaborative from 'collaborative';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';


const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

// https://www.npmjs.com/package/collaborative
// https://github.com/collaborativejs/rich-text-editor-demo/blob/master/index.js
// app.use(express.static(__dirname + '/node_modules/collaborative/dist'));
// app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('Hello World from collaboration-service');
});

app.listen(5050, () => console.log('Collaboration service listening on port ' + 5050 + '!'));