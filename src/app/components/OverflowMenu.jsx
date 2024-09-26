import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { Link } from "react-router-dom";

const OverflowMenu = ({ id, setDeleteTask }) => {
  return (
    <div className="d-flex flex-column justify-content-end align-items-end w-100">
      <Link to={`/taskDetail/${id}`} className="w-25 mr-1 mb-1">
        <button type="button" className="btn btn-secondary btn-sm w-100">Edit</button>
      </Link>

      <button 
        onClick={() => setDeleteTask(id)} 
       
        type="button" 
        className="btn btn-danger w-25 mt-1 mr-1 mb-1 btn-sm">
        Delete
      </button>
    </div>
  );
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setDeleteTask(id) {
      dispatch(mutations.setDeleteTask(id));
    },
  };
};

export const ConnectedOverflowMenu = connect(
  null,
  mapDispatchToProps
)(OverflowMenu);
