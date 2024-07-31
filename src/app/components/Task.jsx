import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  return (
    <div class="card rounded p-1 m-3" style={{ minHeight: "150px", height: "auto" }}>
      <div class="card-body d-flex justify-content-between">
        <Link key={task.id} to={`/taskDetail/${task.id}`}>
          <p class="card-title text-dark" style={{ textDecoration: "none" }}>
            {task.name}
          </p>
        </Link>
        <button class="button p-0 mr-2 btn border-none" style={{height: '0', width: '0', background: 'transparent'}}>...</button>
      </div>
    </div>

  );
};



export default Task;
