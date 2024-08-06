import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from '../store/mutations'
import { take } from "redux-saga/effects";

export const TaskDetails = ({ addTaskComment, setDeleteTask,setGroupName, setTaskName, id, comments, task, groups, isComplete, setTaskComplete, sessionID }) => {
  return (
   <>
   
   
      <div>
        <input className='form-control' type='text' onChange={setTaskName} value={task.name} />
      </div>
      <div>
        <button onClick={() => setTaskComplete(id, !isComplete)}>{isComplete ? "Reopen" : "Complete"}</button>
      </div>
      <form className="form-inline">
        <span>Change group:</span>{" "}
        <select onChange={setGroupName} value={task.group}>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </form>

      <div>
        {comments.map(comment => (
          <div key={comment.id}>
            <span>{comment.content}</span>
            </div>
        ))}
      </div>

{/* Comments form */}
<form className="form-inline" onSubmit={() => addTaskComment(id,sessionID,e)}>
  <input className='form-control' type='text' name='commentContent' autoComplete="off" placeholder="Add a Comment" />
      <Link to="/Dashboard">
        <button>Done</button>
       
      </Link>
      <Link to="/Dashboard">
        <button onClick={() => setDeleteTask(id)}>Delete</button>
      </Link>
</form>
   
   </>

    
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let comments = state.comments.filter(comment => comment.task === id)
  let isOwner = state.sessionID = task.owner
  let groups = state.groups;

  return {
    id,
    task,
    comments,
    isOwner,
    sessionID: state.session.id,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.id;
return{
  setTaskComplete(id, isComplete){
    dispatch(mutations.setTaskComplete(id, isComplete))
   },
  setTaskName(e){
    dispatch(mutations.setTaskName(id, e.target.value))
  },
  setGroupName(e){
    return dispatch(mutations.setGroupName(id, e.target.value))
  },
  setDeleteTask(id){
dispatch(mutations.setDeleteTask(id))
  },
  addTaskComment(taskID, ownerID, e) {
    let input = e.target['commentContent']
    let commentID = uuid();
    let content = input.value;
    e.preventDefault();
    if(content !== '') {
      input.value = ''
      dispatch(addTaskComment(ownerID, commentID, taskID, content))
    }

  }


}
}

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
