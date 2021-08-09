import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {

  const [ showAddTask, setShowAddTask ] = useState(false)
  const [ tasks, setTasks ] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('https://my-json-server.typicode.com/ethanshealey/react-todo/tasks')
    const data = await res.json()

    console.log(data)

    return data
  }

  const fetchTask = async id => {
    const res = await fetch(`https://my-json-server.typicode.com/ethanshealey/react-todo/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const addTask = async task => {
    const res = await fetch('https://my-json-server.typicode.com/ethanshealey/react-todo/tasks', { 
      method: 'POST', 
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  const toggleReminder = async id => {
    const task = await fetchTask(id)

    const updateTask = { ...task, reminder: !task.reminder}

    const res = await fetch(`https://my-json-server.typicode.com/ethanshealey/react-todo/tasks/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task
    ))
  }

  const deleteTask = async id => {
    await fetch(`https://my-json-server.typicode.com/ethanshealey/react-todo/tasks/${id}`, { 
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <Router>
      <div className="container">
          <Header title='todo' onAdd={() => (setShowAddTask(!showAddTask))} showAddTask={showAddTask} />
          <Route path='/' exact render={(props) => (
            <>
            { showAddTask && <AddTask onAdd={addTask} />}
            { tasks.length > 0 ? 
              <Tasks 
                tasks={tasks} 
                onDelete={deleteTask} 
                onToggle={toggleReminder} 
              /> 
            : 
              'No Tasks'
            }
            </>
          )} />      
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
