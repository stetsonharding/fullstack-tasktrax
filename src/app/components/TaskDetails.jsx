import React, {useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

import uuid from "uuid";
import login_bg from '../../../src/assets/login_bg.jpg'



// import login_bg from 

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


  // const containerStyle = {
  //   backgroundImage: `url(${login_bg})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  //   height: '100vh', // Ensure the container takes full height
  // };


  return (
    <div className="container-fluid">
      <div className='row  h-100 d-flex justify-content-center align-items-center'>
        <div className='col d-flex h-50 flex-column justify-content-center align-items-center'>

      {/* Change Group */}
      <form className="form-inline">
      </form>
      <div className='d-flex'> 
      {/* <div>
        <button onClick={() => setTaskComplete(id, !isComplete)}>
        {isComplete ? "Reopen" : "Complete"}
        </button>
        </div> */}
      </div>

      <form
        className="form-inline d-flex justify-content-center align-items-center flex-column h-75 w-50 rounded"
        style={{ border: '1px solid black'}}
        onSubmit={(e) => addTaskComment(id, sessionID, e, commentContent, comment.content)}
        >
      {/* Comments form */}
        <span style={{fontSize:'1.2rem'}}>Change Task Status:</span>{" "}
        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" style={{width: '150px'}} onChange={setGroupName} value={task.group}>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
          <h5>Your Task Details</h5>
        <input
          className="form-control w-50 mb-1 rounded"
          type="text"
          onChange={setTaskName}
          value={task.name}
        />
        <input
          className="form-control w-50 rounded"
          type="text"
          name="commentContent"
          autoComplete="off"
          placeholder="Add a Comment"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        />

      <div className='d-flex mt-2 g-2'>

      <Link to="/Dashboard"><button className="btn btn-primary mr-2"type="submit">Done</button></Link>
        <Link to="/Dashboard">
          <button type="button" className="btn btn-danger" onClick={() => setDeleteTask(id)}>
            Delete
          </button>
        </Link>
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
