import React from 'react'
import { connect } from 'react-redux';

export const Login = () => {
    return (<h2>Login!</h2>)
}

const mapStateToProps = state => state;

export const ConnectedLogin = connect(mapStateToProps)(Login)
