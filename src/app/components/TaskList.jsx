import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";

import Task from "./Task";

export const TaskList = ({ tasks, name, id, createNewTask, comments }) => {



  return (
    <div className=" col-sm-12 col-md-6 col-lg-4 d-flex justify-content-around mt-4" style={{height: '85%'}} >
      <div
        className="card"
        style={{ width: "80%", backgroundColor: "#f8f7f7", overflow: "auto", height: '100%' }}
      >
        <h5 className="p-2 italic">{name}</h5>
        <div className="" style={{ height: "100%", overflow: "auto" }}>
          {tasks.map((task) => {
            // Filter comments for the current task
            const taskComment = comments.find((comment) => comment.task === task.id) || {};
            return (
              <div key={task.id}>
                {/* Render the Task component */}
                <Task task={task} taskComment={taskComment} />
              </div>
            );
          })}
        </div>

        <div className="d-flex align-items-end justify-content-center w-100">
          <button
            className="p-2 m-3  rounded btn btn btn-primary w-100"
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
  let owner = state.tasks.owner;
  return {
    name: ownProps.name,
    id: groupID,
    comments: state.comments,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      dispatch(requestTaskCreation(id));
    },
  };
};

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
