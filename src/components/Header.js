import React from 'react'
import Button from './Button'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

function Header (props) {
  const location = useLocation()
  return (
    <header className='header'>
      <h1>{props.title}</h1>
      {location.pathname === '/'
        ? <Button
        text={ `${props.showAdd ? 'Hide' : 'Show'} Form` }
        color={props.showAdd ? 'red' : 'green'}
        onClick={props.onClick}
      />
        : null}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  showAdd: PropTypes.bool
}

export default Header
