import React from 'react'
import {connect} from 'react-redux'

const userNameDisplay = ({name}) => {
  return (
    <h4>Welcome, {name}</h4>
  )
}

const mapStateToProps = (state, ownProps) => {
return state.users.find(user => user.id === ownProps.id)
}

export const ConnectedUsernameDisplay = connect(mapStateToProps)(userNameDisplay)