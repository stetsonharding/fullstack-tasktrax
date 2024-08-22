import React, {useState} from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import {ConnectedOverflowMenu} from "./Overflowmenu";

const Task = ({ task, taskComment }) => {
  const [overFlowMenuShown, setOverflowMenuShown] = useState(false)
  return (
    <div
      className="card rounded p-1 m-3"
      style={{ minHeight: "150px", height: "auto" }}
    >
      <div className="card-body d-flex justify-content-between">
        <Link key={task.id} to={`/taskDetail/${task.id}`}>
          <p
            className="card-title text-dark"
            style={{ textDecoration: "none" }}
          >
            {task.name}
          </p>
        </Link>
        <button
          className="button p-0 mr-2 btn border-none"
          style={{ height: "0", width: "0", background: "transparent" }}
          onClick={() => setOverflowMenuShown(!overFlowMenuShown)}
        >
          ...
        </button>
      </div>
     

      {/* Renders all comments for task */}
      <Comment taskComment={taskComment} />
        {overFlowMenuShown && <ConnectedOverflowMenu id={task.id} />}
    </div>
  );
};

export default Task;
