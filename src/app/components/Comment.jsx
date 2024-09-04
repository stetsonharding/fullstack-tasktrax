import React from "react";


const Comment = ({ taskComment }) => {
  
  return (
    
    
        <div className="ml-2">
          {taskComment.content && <span>{taskComment.content}</span>}
        </div>
    
   
  );
};

export default Comment;
