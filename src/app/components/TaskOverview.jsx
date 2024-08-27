import React from 'react'

function TaskOverview(props) {
  return (
    <div className="card mt-4" style={{width: '18rem', height: 'fit-content'}}>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <p className="card-text">{props.length}</p>
  </div>
</div>
  )
}

export default TaskOverview
