import React, {useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";
import { take } from "redux-saga/effects";
import uuid from "uuid";

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

  console.log(comment)
  return (
    <>
     
  
      
      <form className="form-inline">
        <input
          className="form-control"
          type="text"
          onChange={setTaskName}
          value={task.name}
        />
      
        <span>Change group:</span>{" "}
        <select onChange={setGroupName} value={task.group}>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </form>

      {/* Comments form */}
      <form
        className="form-inline"
        onSubmit={(e) => addTaskComment(id, sessionID, e, commentContent, comment.content)}
      >
        <input
          className="form-control"
          type="text"
          name="commentContent"
          autoComplete="off"
          placeholder="Add a Comment"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        />

        <button type="submit">Done</button>

        <Link to="/Dashboard">
          <button type="button" onClick={() => setDeleteTask(id)}>
            Delete
          </button>
        </Link>
      </form>
    </>
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
      console.log("ran");
      // let input = e.target["commentContent"];
      let commentID = uuid();
      // let content = input.value;
      if (content !== commentContent) {
      
        dispatch(mutations.addTaskComment(commentID, taskID, ownerID, content));
      }
    },
  };
};

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetails);
