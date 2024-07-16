import {addNewTask, updateTask} from './server'


(async function myFuncTest () {
     await addNewTask({
        name: 'My Task Number 2',
        id:'12345'
    })

    await updateTask({
        id:'1234',
        name: 'task1234 -- UPDATED!'
    })

})();

