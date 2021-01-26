import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

function Tasks (props) {
  return (
    <>
      {props.tasks.map((task, index) => {
        return (
          <Task key={index} task={task}
          onDelete={props.onDelete}
          onToggle={props.onToggle}/>
        )
      })}
    </>
  )
}

Tasks.propTypes = {
  tasks: PropTypes.array,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func
}

export default Tasks
