import React, { useState } from 'react';
import Modal from 'react-modal';

const EditTask = ({ task, updateTask, setIsEditing }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    updateTask(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <Modal isOpen={true} onRequestClose={() => setIsEditing(false)}>
      <div className="edit-task modal-container">
        <form onSubmit={handleSubmit}>
          <input
          name="taskName"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="update">Update</button>
          <button className="cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditTask;
