import React from 'react'
import overviewIcon from '../../assets/overviewIcon.png'

function TaskOverview(props) {
  return (
    <div className="card mt-4" style={{width: '18rem', height: 'fit-content'}}>
  <div className="card-body d-flex justify-content-between align-items-center m-2">
    <img src={overviewIcon}  alt="Task Icon" />
    <div >

    <h5 className="card-title">{props.name}</h5>
    <p className="card-text text-center"><strong>{props.length}</strong></p>
    </div>
  </div>
</div>
  )
}

export default TaskOverview
