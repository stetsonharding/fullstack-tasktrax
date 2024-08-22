import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { Link } from "react-router-dom";


const OverflowMenu = ({id, setDeleteTask}) => {

    return (
        <div className="overflow-menu mt-1 d-flex flex-column justify-content-end align-items-end w-full">
           <Link  to={`/taskDetail/${id}`}>
            <button className="btn btn-light mb-1 btn-sm w-25" >Edit</button>
           </Link>
            <button className="btn btn-light  btn-sm w-25" onClick={() => setDeleteTask(id)}>Delete</button>
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
  


