import React from "react";


const Comment = ({ taskComment }) => {
  
  return (
    <div>
    
        <div >
          {taskComment.content && <span>{taskComment.content}</span>}
        </div>
    
    </div>
  );
};

export default Comment;
