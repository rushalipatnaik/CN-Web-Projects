import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Card = ({ task, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <i className="far fa-edit m-3" onClick={handleEdit}></i>
        <i className="fas fa-trash-alt" onClick={handleDelete}></i>
      </div>
      {isEditing && (
        <EditTask task={task} updateTask={updateTask} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Card;