import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = () => {
    return(
        <Link to="/Dashboard"><h2>Application</h2></Link>
    )
}

export const ConnectedNavigation = connect(state=>state)(Navigation)