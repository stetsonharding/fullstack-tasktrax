import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from '../store/mutations'
import { Link } from "react-router-dom";

export const TaskList = ({ tasks, name, id, createNewTask }) => {
  return (
    <div className=" col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center" >
    <div className="card mt-5 m-4" style={{width:'88%', backgroundColor:'#dfdfdf'}}>
      <h5 className="p-2 italic">{name}</h5>
      <div>
        {tasks.map((task) => (
          <Link key={task.id} to={`/taskDetail/${task.id}`}>
            <div key={task.id}>{task.name}</div>

          </Link>
        ))}
      </div>
      <button className="p-2 m-3 border-none rounded btn btn-light" onClick={() => createNewTask(id)}>+Add Task</button>
    </div>

    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log('creating new task..', id)
      dispatch(requestTaskCreation(id))
    }
  }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);
