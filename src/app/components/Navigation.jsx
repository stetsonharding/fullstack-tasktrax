import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedUsernameDisplay } from './userNameDisplay';
import * as mutations from "../store/mutations"
const Navigation = ({id, authenticated}) => {

    const gradientTextStyle = {
        background: 'linear-gradient(55deg, #018de2,#0067ce)',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    return (
        <div>
            
            <Link to="/Dashboard"><h3 style={gradientTextStyle}>Task Trax</h3></Link>
        {authenticated && <ConnectedUsernameDisplay id={id}/> }
        </div>
    )
}

const mapStateToProps = ({session}) =>{
    return {
        id:session.id,
    authenticated:session.authenticated == mutations.AUTHENTICATED
    }
}

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);