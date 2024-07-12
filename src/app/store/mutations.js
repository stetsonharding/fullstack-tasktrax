//mutations - template for all the changes in application state we may want to do.

export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';

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
        id: id,
        isComplete
    }
)