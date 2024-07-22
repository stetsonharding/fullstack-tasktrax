import React from 'react'
import { connect } from 'react-redux';
import * as mutations from '../store/mutations'

export const Login = ({authenticateUser, authenticated}) => {
    return (
        <div>
            <h2>Please login</h2>
            <form onSubmit={authenticateUser}>
                <input  type="text" placeholder='Enter Username' name="username" defaultValue="Dev" />
                <input  type="password" placeholder='Enter Password' name="password" defaultValue="" />
                <span>{authenticated === mutations.NOT_AUTHENTICATED ? <p>Login Incorrect</p> : null}</span>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    authenticateUser(e) {
        e.preventDefault();
        let userName = e.target['username'].value;
        let password = e.target['password'].value;

        dispatch(mutations.requestAuthenticateUser(userName, password))
        
    }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
