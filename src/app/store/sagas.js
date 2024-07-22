import {take, put, select} from 'redux-saga/effects'
import uuid from 'uuid'
import axios from 'axios'
import * as mutations from './mutations'
import {history} from './History'

const url = "http://localhost:7777"

//Saga to add a new task
export function* taskCreationSaga() {
    while (true) {
        const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = 'U1';
        const taskID = uuid();
        yield put(mutations.createTask(taskID, groupID, ownerID))
       
        //http req for creating task
        const {res} = yield axios.post(url + '/task/new',{
           task:{
            id:taskID,
            group: groupID,
            owner: ownerID,
            isComplete: false,
            name: "New Task"
           } 
        })
    }
}


export function* taskModificationSaga() {
    while(true) {
        const task = yield take([
            mutations.SET_TASK_NAME, 
            mutations.SET_GROUP_NAME, 
            mutations.SET_TASK_COMPLETE
        ])

      
        axios.post(url + '/task/update', {
            task:{
                id: task.taskID,
                group:task.groupID,
                isComplete: task.isComplete,
                name: task.name
            }
        })

       
    }
}

export function* taskDelete(){
    while(true) {
        const task = yield take(mutations.SET_DELETE_TASK);

        axios.post(url + '/task/delete', {
            task:{
                id: task.taskID,
                
            }
        })
    }
}

export function* userAuthenticationSaga() {
while(true) {
    const {username, password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);

    try{
        const {data} = yield axios.post(url + '/authenticate', {username, password});

        if(!data) {
            throw new Error();
        }

        console.log('authenticated', data)

        yield put(mutations.setState(data.state))
        yield put (mutations.processAuthenticateUser(mutations.AUTHENTICATED))
        history.push('/dashboard')
    }catch(e){
        console.log("cant authenticate")
        yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
    }

}
}
