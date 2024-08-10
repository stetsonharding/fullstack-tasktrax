import React from "react";
import { connect } from "react-redux";

const Comment = ({ taskComments }) => {
  return (
    <div>
      {taskComments.map((comment) => (
        <div key={comment.id}>
          <span>{comment.content}</span>
        </div>
      ))}
    </div>
  );
};

export default Comment;
