//mutations - template for all the changes in application state we may want to do.

export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';
export const SET_TASK_NAME = 'SET_TASK_NAME';
export const SET_GROUP_NAME = 'SET_GROUP_NAME';
export const SET_DELETE_TASK = 'SET_DELETE_TASK';
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER'
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER'
export const AUTHENTICATING = 'AUTHENTICATING'
export const AUTHENTICATED = 'AUTHENTICATED'
export const NOT_AUTHENTICATED ='NOT_AUTHENTICATED'
export const SET_STATE = 'SET_STATE'



export const requestTaskCreation = (groupID) =>({
    type: REQUEST_TASK_CREATION,
    groupID
})

export const createTask = (taskID, groupID, ownerID) =>({
    type: CREATE_TASK,
    taskID,
    groupID,
    ownerID
})

export const setTaskComplete = (id, isComplete) => (
    {
        type: SET_TASK_COMPLETE,
        taskID: id,
        isComplete
    }
)

export const setTaskName = (taskID, name) => (
    {
        type: SET_TASK_NAME,
       taskID,
        name
    }
)

export const setGroupName = (taskID, groupID) => (
    {
        type: SET_GROUP_NAME,
        taskID,
        groupID,
        
    }
)

export const setDeleteTask = (taskID) => (
    {
        type: SET_DELETE_TASK,
        taskID
       
        
    }
)

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
})

export const processAuthenticateUser = (status = 'AUTHENTICATING', session = null) => ({
type: PROCESSING_AUTHENTICATE_USER,
session,
authenticated: status
})

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
})
