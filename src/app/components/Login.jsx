import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

import { ConnectedNavigation } from "./Navigation";
import login_bg from "../../assets/login_bg.jpg"

export const Login = ({ authenticateUser, authenticated }) => {

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100" style={{backgroundImage: `url(${login_bg})`,backgroundSize: 'cover',backgroundPosition: 'center', imagebackgroundRepeat: 'no-repeat'}}>
    <div className="row justify-content-center w-75 h-50">
      <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center flex-column rounded" style={{ backgroundColor: 'white' }}>
       <ConnectedNavigation />
        <div className="w-75 mb-3 ">
          <h3>Login</h3>
          <i><h5 className="lead text-dark">to get started</h5></i>
        </div>
        <form
          onSubmit={authenticateUser}
          className="d-flex flex-column justify-content-center align-items-center w-100 rounded"
        >
          <input
            className="p-2 rounded w-75 mb-2"
            type="text"
            placeholder="Enter Username"
            name="username"
            defaultValue="Dev"
            required
          />
          <input
            className="p-2 rounded w-75 mb-2"
            type="password"
            placeholder="Enter Password"
            name="password"
            defaultValue=""
            required
          />
          <span>
            {authenticated === mutations.NOT_AUTHENTICATED ? (
              <p className='text-left text-danger'>Login Incorrect</p>
            ) : null}
          </span>
          <button className="w-75 btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  authenticateUser(e) {
    e.preventDefault();
    let userName = e.target["username"].value;
    let password = e.target["password"].value;

    dispatch(mutations.requestAuthenticateUser(userName, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
