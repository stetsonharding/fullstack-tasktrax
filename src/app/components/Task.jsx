import React, {useState} from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import {ConnectedOverflowMenu} from "../components/OverflowMenu";

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
            style={{ textDecoration: "none", textDecoration: task.group === 'G3' ? 'line-through' : null }}
          >
            {task.name}
          </p>
        </Link>
        <span
          style={{ height: "25px", width: "25px", cursor: 'pointer', fontSize: '22px' }}
          onClick={() => setOverflowMenuShown(!overFlowMenuShown)}
        >
          ...
        </span>
      </div>
     


      {/* Renders all comments for task */}
      <Comment taskComment={taskComment} />
        {overFlowMenuShown && <ConnectedOverflowMenu id={task.id} />}

    </div>
  );
};

export default Task;
