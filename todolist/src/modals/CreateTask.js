import React, { useState } from 'react';
import Modal from 'react-modal';

const CreateTask = ({ addTask, closeModal, isOpen }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      title,
      description,
    };
    addTask(newTask);
    closeModal();
    setTitle('');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div className="create-task">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="taskName"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="description"
            rows="3"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="create">Create Task</button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTask;
