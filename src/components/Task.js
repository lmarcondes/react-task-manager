import React from 'react'
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'

function Task (props) {
  return (
    <div className={`task ${props.task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => props.onToggle(props.task.id)}>
      <h3>
        {props.task.text} <FaTimes style={{
          color: 'red',
          cursor: 'pointer'
        }}
          onClick={() => { props.onDelete(props.task.id) }}
        />
      </h3>
      <p>{props.task.day}</p>
      <p>Reminder: {props.task.reminder ? 'on' : 'off'}</p>
    </div>
  )
}

Task.propTypes = {
  task: PropTypes.object,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func
}

export default Task
