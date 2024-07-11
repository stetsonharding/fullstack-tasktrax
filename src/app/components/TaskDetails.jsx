import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const TaskDetails = ({id, comments, task, groups, isComplete}) => {
return (
    <div>
        <h3>{task.name}</h3>
        <button>Complete Task</button>
        <div>
        <span>Change group:</span>
        {" "}
        <select>
            {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
            ))}
        </select>

        </div>
     <Link to="/Dashboard">
        <button>Done</button>
     </Link>
    </div>
)
}

const mapStateToProps = (state, ownProps) => {
 
   let id = ownProps.match.params.id;
   let task = state.tasks.find(task => task.id === id);
   let groups = state.groups;

   return{
    id,
    task,
    groups,
    isComplete: task.isComplete
   }

  };

export const ConnectedTaskDetail = connect(mapStateToProps)(TaskDetails)