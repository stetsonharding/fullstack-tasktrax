import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList'

import { ConnectedNavigation } from './Navigation';
import TaskOverview from './TaskOverview';

export const Dashboard = ({ groups }) => {
    return (
        <div className="container-fluid d-flex flex-column justify-content-center h-75">
            <ConnectedNavigation />
            <div className="d-flex justify-content-around align-items-center" style={{width: '100%', height: '25%'}}> 
                <TaskOverview />
                <TaskOverview />
                <TaskOverview />
            </div>
            <div className="row w-100">
            {groups.map(group => (
                    <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
                ))}
                </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        groups: state.groups
    }

}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard) 