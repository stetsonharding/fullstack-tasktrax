import { group } from 'mongodb/lib/operations/collection_ops';
import React from 'react';
import { connect } from 'react-redux';

export const TaskList = ({tasks}) => {
    return(
<div>
    {tasks.map(task => (<div>{task.name}</div>))}
</div>
    )
}  

const mapStateToProps = (state, ownProps) => {
let groupID = ownProps.id;
return {
    name: ownProps.name,
    id: groupID,
    task: state.tasks.filter(task => task.group === groupID)
}
}

export const ConnectedTaskList = connect(mapStateToProps) (TaskList)