import './index.css'
import {FaTrash, FaEdit, FaSave} from 'react-icons/fa'

import Popup from 'reactjs-popup'

const TaskItem = props => {
  const {taskDetails, deleteTask, handleEditing, isEditing} = props
  const {title, description, date, status, id} = taskDetails

  const onDeleteTask = () => {
    deleteTask(id)
  }

  const editTask = () => {
    handleEditing(isEditing)
  }

  return (
    <li className="task-item">
      <div className="task-info">
        <div className="name-trash-container">
          {!isEditing ? (
            <p className="task-title">{title}</p>
          ) : (
            <input type="text" value={title} />
          )}

          <button type="button" className="edit-button" onClick={editTask}>
            {!isEditing ? <FaEdit size={10} /> : <FaSave size={10} />}
          </button>
          <Popup
            modal
            trigger={
              <button
                type="button"
                className="delete-button"
                onClick={onDeleteTask}
              >
                <FaTrash size={10} />
              </button>
            }
          >
            {close => (
              <div className="popup-container">
                <p className="instruction">Are you sure you want to delete?</p>
                <div>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={close}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onDeleteTask}
                    className="confirm-button"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>

        {!isEditing ? (
          <p className="task-description">{description}</p>
        ) : (
          <input type="text" value={description} />
        )}
        {!isEditing ? (
          <p className="task-description">Task Status: {status}</p>
        ) : (
          <input type="text" value={status} />
        )}
        {!isEditing ? (
          <p className="task-date">Due date: {date}</p>
        ) : (
          <input type="date" value={date} />
        )}
      </div>
    </li>
  )
}

export default TaskItem
