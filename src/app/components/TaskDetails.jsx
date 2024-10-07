import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";
import uuid from "uuid";
import login_bg from "../../assets/login_bg.jpg"
import { history } from "../store/History";

export const TaskDetails = ({
  addTaskComment,
  setDeleteTask,
  setGroupName,
  setTaskName,
  id,
  task,
  groups,
  isComplete,
  setTaskComplete,
  sessionID,
  comment
}) => {

  const [commentContent, setCommentContent] = useState(comment.content || "")

  const gradientTextStyle = {
    background: 'linear-gradient(55deg, #018de2,#0067ce)',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
  return (
    <div className="container-fluid" style={{
      backgroundImage: `url(${login_bg})`, backgroundSize: 'cover', backgroundPosition: 'center', imagebackgroundRepeat: 'no-repeat'
    }}>
      <div className='row  h-100 d-flex justify-content-center align-items-center'>
        <div className='col d-flex h-50 flex-column justify-content-center align-items-center'>
          <form
            className="form-inline d-flex justify-content-center  flex-column h-100 w-50 rounded"
            style={{ backgroundColor: 'white', border: '2px solid black' }}
            onSubmit={(e) => addTaskComment(id, sessionID, e, commentContent, comment.content)}
          >
            <h4 style={gradientTextStyle}>Task Details</h4>
           {/* Change Task Status */}
            <span style={{ fontSize: '1rem' }}>Change Task Status:</span>{" "}
            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" style={{ width: '150px' }} onChange={setGroupName} value={task.group}>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            {/* Name Input */}
            <div className="form-group w-75 rounded mb-2  ">
              <label className=" " htmlFor="name">Task Name</label>
              <input
                className="form-control w-100 rounded"
                type="text"
                name="name"
                onChange={setTaskName}
                value={task.name}
              />
            </div>
            {/* Comment Input */}
            <div className="form-group w-75 rounded  ">
              <label className=" " htmlFor="commentContent">Comment</label>
              <input
                className="form-control w-100 rounded"
                type="text"
                name="commentContent"
                autoComplete="off"
                placeholder="Add a Comment"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
            </div>

              {/* Form Buttons */}
            <div className='d-flex mt-4 gx-4'>
              <button className="btn btn-md btn-primary mr-2" type="submit">Done</button>
              <Link to="/Dashboard">
                <button type="button" className="btn btn-md btn-danger" onClick={() => setDeleteTask(id)}>
                  Delete
                </button>
              </Link>
              <button className="btn btn-success btn-md ml-2" onClick={() => setTaskComplete(id, !isComplete)}>
                {isComplete ? "Reopen" : "Complete"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let isOwner = (state.session.id = task.owner);
  let comment = state.comments.find(comment => comment.task === id)
  let groups = state.groups;

  return {
    id,
    comment: comment ? comment : "",
    task,
    isOwner,
    sessionID: state.session.id,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskComplete(id, isComplete) {
      dispatch(mutations.setTaskComplete(id, isComplete));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    },
    setGroupName(e) {
      dispatch(mutations.setGroupName(id, e.target.value));
    },
    setDeleteTask(id) {
      dispatch(mutations.setDeleteTask(id));
    },
    addTaskComment(taskID, ownerID, e, content, commentContent) {
      e.preventDefault();
      let commentID = uuid();
      //Comment is not being updated needs to be added
      if (content !== commentContent) {
        dispatch(mutations.addTaskComment(commentID, taskID, ownerID, content));
      }
      //Navigate to home page
      history.push('/Dashboard')
    },
  };
};

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetails);
