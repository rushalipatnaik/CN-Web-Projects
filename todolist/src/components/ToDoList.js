import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Card from './Card';
import CreateTask from '../modals/CreateTask';

const ToDoList = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
    closeCreateModal();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="task-container">
      <button className='create-task' onClick={openCreateModal}>Add Task</button>
      <CreateTask addTask={addTask} closeModal={closeCreateModal} isOpen={isCreateModalOpen} />
      {tasks.map((task) => (
        <Card key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
    </div>
  );
};

export default ToDoList;
