import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskItem from '../TaskItem'
import './index.css'

const optionsArray = [
  {optionId: 'Pending', optionStatus: 'Pending'},
  {optionId: 'In Progress', optionStatus: 'In Progress'},
  {optionId: 'Completed', optionStatus: 'Completed'},
]

class Tasks extends Component {
  state = {
    title: '',
    date: '',
    description: '',
    status: optionsArray[0].optionStatus,
    isEditing: false,
    taskList: [],
  }

  componentDidMount() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (savedTasks) {
      this.setState({taskList: savedTasks})
    } else {
      this.setState({taskList: []})
    }
  }

  componentDidUpdate(prevState) {
    const {taskList} = this.state
    if (prevState.taskList !== taskList) {
      localStorage.setItem('tasks', JSON.stringify(taskList))
    }
  }

  //   handleTitleEdit = event => {
  //     this.setState({title: event.target.value})
  //   }

  handleEditing = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }))
  }

  deleteTask = id => {
    const {taskList} = this.state
    const filteredTaskList = taskList.filter(eachTask => eachTask.id !== id)
    this.setState({taskList: filteredTaskList})
  }

  onAddTask = event => {
    event.preventDefault()
    const {title, date, description, status} = this.state

    const newTask = {
      title,
      description,
      date,
      status,
      id: uuidv4(),
    }

    if (title !== '' && description !== '' && date !== '') {
      this.setState(({taskList}) => ({
        taskList: [...taskList, newTask],
        title: '',
        description: '',
        date: '',
        status: optionsArray[0].optionStatus,
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeOptionStatus = event => {
    this.setState({status: event.target.value})
  }

  renderTitle = () => {
    const {title} = this.state
    return (
      <div className="input-field-container">
        <label className="label-name" htmlFor="title">
          TITLE
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Title"
          onChange={this.onChangeTitle}
          value={title}
          id="title"
        />
      </div>
    )
  }

  renderDate = () => {
    const {date} = this.state
    return (
      <div className="input-field-container">
        <label className="label-name" htmlFor="date">
          DUE DATE
        </label>
        <input
          className="input-field"
          type="date"
          onChange={this.onChangeDate}
          value={date}
          id="date"
        />
      </div>
    )
  }

  renderDescription = () => {
    const {description} = this.state
    return (
      <div className="input-field-container">
        <label className="label-name" htmlFor="description">
          DESCRIPTION
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Description"
          onChange={this.onChangeDescription}
          value={description}
          id="description"
        />
      </div>
    )
  }

  renderStatus = () => {
    const {status} = this.state
    return (
      <div className="input-field-container">
        <label className="label-name" htmlFor="status">
          STATUS
        </label>
        <br />
        <select
          className="input-field"
          onChange={this.onChangeOptionStatus}
          value={status}
        >
          {optionsArray.map(option => (
            <option key={option.optionId} value={option.optionId}>
              {option.optionStatus}
            </option>
          ))}
        </select>
      </div>
    )
  }

  renderInputTaskForm = () => (
    <form className="input-form" onSubmit={this.onAddTask}>
      {this.renderTitle()}
      {this.renderDescription()}
      {this.renderDate()}
      {this.renderStatus()}
      <br />
      <button type="submit" className="task-button">
        Add Task
      </button>
    </form>
  )

  renderTasks = () => {
    const {taskList, isEditing} = this.state
    return (
      <ul className="tasks-container">
        {taskList.map(eachTask => (
          <TaskItem
            taskDetails={eachTask}
            key={eachTask.id}
            deleteTask={this.deleteTask}
            isEditing={isEditing}
            handleEditing={this.handleEditing}
            handleTitleEdit={this.handleTitleEdit}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="tasks-app-container">
        <div className="app-responsive-container">
          <div className="card-content">
            <h1 className="main-heading">Task Tracker</h1>
            <div className="task-section">
              {this.renderInputTaskForm()}
              <img
                src="https://i.pinimg.com/736x/28/c6/83/28c683a8155927074a857aecc4406b64.jpg"
                alt="tasks"
                className="tasks-img"
              />
            </div>
            <hr className="separator" />
            <div className="title-section">
              <h1 className="tasks">Tasks</h1>
            </div>
          </div>
          {this.renderTasks()}
        </div>
      </div>
    )
  }
}

export default Tasks
