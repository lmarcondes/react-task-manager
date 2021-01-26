import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './About'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const SERVER_HOST = 'http://192.168.0.3'

function App () {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(`${SERVER_HOST}:5000/tasks`)
    const data = await res.json()
    return data
  }
  // Fetch a single task
  const fetchTask = async (id) => {
    const res = await fetch(`${SERVER_HOST}:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`${SERVER_HOST}:5000/tasks`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`${SERVER_HOST}:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    const res = await fetch(`${SERVER_HOST}:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })
    const data = await res.json()
    setTasks(tasks.map((task) =>
      task.id === id
        ? { ...task, reminder: !data.reminder }
        : task))
  }

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
      <div className="container">
        <Header
          title='Task Tracker'
          onClick={toggleAddTask}
          showAdd={showAddTask}
        />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <
              AddTask
              onAdd={addTask}
            />}
            {tasks.length > 0
              ? <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
              : 'No Tasks to Show'}
          </>
        )}
        />
        <Route path="/about" component={About}/>
      <Footer />
      </div>
    </Router>
  )
}

export default App
