import React from "react";

const Task = ({ task }) => {
  return (
    <div
      className="card rounded p-1 m-3"
      style={{ minHeight: "150px", height: "auto" }}
    >
      <p
        className="pl-2 pt-2"
        style={{ textDecoration: "none", color: "black" }}
      >
        <i>{task.name}</i>
      </p>
      comments go here
      Date Created?
      
    </div>
  );
};

export default Task;
