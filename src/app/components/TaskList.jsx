import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";
import Task from "./Task";

export const TaskList = ({ tasks, name, id, createNewTask }) => {
  return (
    <div className=" col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center h-100">
      <div
        className="card mt-5 m-4"
        style={{ width: "80%", backgroundColor: "#dfdfdf", overflow: 'auto' }}
      >
        <h5 className="p-2 italic">{name}</h5>
        <div className="" style={{ height: '100%', overflow: 'auto' }}>
          {tasks.map((task) => (
            <Link key={task.id} to={`/taskDetail/${task.id}`}>
              <Task key={task.id} task={task} />
            </Link>
          ))}
        </div>
        <div className="d-flex align-items-end justify-content-center w-100">
          <button
            className="p-2 m-3  rounded btn btn-light w-100"
            onClick={() => createNewTask(id)}
          >
            +Add Task
          </button>
        </div>
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
      console.log("creating new task..", id);
      dispatch(requestTaskCreation(id));
    },
  };
};

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
