import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectDB } from './connect-db'

let port = 7777;

//create new express instance
let app = express();
app.listen(port, console.log('Server lisening on port', port))

//Plugins used in application
app.use(
    cors(),
    //Let us use post requests
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

//function to add task and communicate with database for testing
export const addNewTask = async (task) => {
    let db = await connectDB();
    let collection = db.collection('tasks')
    await collection.insertOne(task)
}

export const updateTask = async (task) => {
    let { id, group, isComplete, name } = task;
    let db = await connectDB();
    let collection = db.collection('tasks')

    //update group attr
    if (group) {
        //Pass the id of the task you want to update, and set the new group user has defined
        await collection.updateOne({ id }, { $set: group })
    }
    //update name attr
    if (name) {
        await collection.updateOne({ id }, { $set: { name } })
    }
    //update isComplete attr
    if (isComplete !== undefined) {
        await collection.updateOne({ id }, { $set: { isComplete } })
    }
}


export const deleteTask = async (task) => {
    let { id } = task;
    let db = await connectDB();
    let collection = db.collection('tasks')

    //update group attr
    if (id) {
        //Pass the id of the task you want to update, and set the new group user has defined
        await collection.deleteOne({ id })
    }

}


//root to add new tasks
app.post('/task/new', async (req, res) => {
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
})

//root to update tasks
app.post('/task/update', async (req, res) => {
    let task = req.body.task;
    await updateTask(task);
    res.status(200).send();
})

//root to delete tasks
app.post('/task/delete', async (req, res) => {
    let task = req.body.task;
    await deleteTask(task);
    res.status(200).send();
})