import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList'

export const Dashboard = ({ groups }) => {
    return (
        <div className="container-fluid d-flex justify-content-center h-75">
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