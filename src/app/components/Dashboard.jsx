import React from 'react';
import { connect } from 'react-redux';
import {ConnectedTaskList} from './TaskList'

export const Dashboard = ({groups}) => {
    return (
        <>
       {groups.map(group => (
     

           <ConnectedTaskList  key={group.id} id={group.id} name={group.name} />
      
       ))}
        </>
    );
};

const mapStateToProps = (state) => {
return {
    groups: state.groups
}

}

export const ConnectedDashboard = connect(mapStateToProps) (Dashboard) 