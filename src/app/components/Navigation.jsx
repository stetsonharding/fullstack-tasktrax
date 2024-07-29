import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = () => {
    return (
        <Link to="/Dashboard"><i><h3 className="mb-5" style={{ textDecoration: 'none', color: 'primary-blue' }}>Task Trax</h3></i></Link>
    )
}

export const ConnectedNavigation = connect(state => state)(Navigation)