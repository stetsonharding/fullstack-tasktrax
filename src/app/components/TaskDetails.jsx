import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from '../store/mutations'

export const TaskDetails = ({ setDeleteTask,setGroupName, setTaskName, id, comments, task, groups, isComplete, setTaskComplete }) => {
  return (
    <div>
      <div>
        <input onChange={setTaskName} value={task.name} />
      </div>
      <div>
        <button onClick={() => setTaskComplete(id, !isComplete)}>{isComplete ? "Reopen" : "Complete"}</button>
      </div>
      <div>
        <span>Change group:</span>{" "}
        <select onChange={setGroupName} value={task.group}>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <Link to="/Dashboard">
        <button>Done</button>
       
      </Link>
      <Link to="/Dashboard">
        <button onClick={() => setDeleteTask(id)}>Delete</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let groups = state.groups;

  return {
    id,
    task,
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
  }


}
}

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
