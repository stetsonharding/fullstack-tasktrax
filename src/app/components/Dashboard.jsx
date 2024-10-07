import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList'

import { ConnectedNavigation } from './Navigation';
import TaskOverview from './TaskOverview';

export const Dashboard = ({ groups, toDoLength, doingLength, doneLength }) => {

   
    return (
        <div className="container-fluid d-flex m-1 flex-column justify-content-start" style={{height: '100%'}}>
            <ConnectedNavigation />
            <div className="row d-flex justify-content-around align-items-start w-100">
                <TaskOverview name="To Do's" length={toDoLength} />
                <TaskOverview name="Doing" length={doingLength} />
                <TaskOverview name="Done" length={doneLength}/> 
            </div>
            <div>
                <h5 className="m-1 mt-3">Task Sections</h5>
                <hr />

            </div>
            <div className="row w-100 h-100">
            {groups.map(group => (
                    <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
                ))}
                </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    let toDoLength = state.tasks.filter(task => task.group === 'G1').length;
    let doingLength = state.tasks.filter(task => task.group === 'G2').length;
    let doneLength = state.tasks.filter(task => task.group === 'G3').length;

    return {
        groups: state.groups,
        toDoLength,
        doneLength,
        doingLength
    }

}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard) 