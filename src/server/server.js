import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {connectDB} from './connect-db'

let port = 7777;

//create new express instance
let app = express();
app.listen(port, console.log('Server lisening on port', port))

//Plugins used in application
app.use(
    cors(),
    //Let us use post requests
    bodyParser.urlencoded({extended: true}),
    bodyParser.json()
);

//function to communicate with database for testing
export const addNewTask = async (task) => {
let db = await connectDB();
let collection = db.collection('tasks')
await collection.insertOne(task)
}

//root to add new tasks
app.post('/task/new', async (req,res) => {
let task = req.body.task;
await addNewTask(task);
res.status(200).send();
})