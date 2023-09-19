import React, { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const TodoItem = ({ todo, setRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedtask, setEditedtask] = useState(todo.task);

  const handleClick = (title) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log('todo updated.');
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'DELETE',
    }).then(() => {
      console.log('todo deleted.');
      setRefresh(true);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    todo.task = editedtask;

    fetch('http://localhost:8000/todos/' + todo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log('todo edited.');
      setIsEditing(false);
      setRefresh(true);
    });
  };

  const handleEditCancel = () => {
    setEditedtask(todo.task);
    setIsEditing(false);
  };

  return (
    <li className={`${todo.complete ? 'checked' : ''}`}>
      {isEditing ? (
        <div className="kolom-edit">
          <input type="text" value={editedtask} onChange={(e) => setEditedtask(e.target.value)} />
          <button
            onClick={() => {
              handleClick('Item berhasil di Edit!');
              handleEditSave();
            }}
          >
            Save
          </button>
          <button onClick={handleEditCancel}>Cancel</button>
        </div>
      ) : (
        <div
          onClick={() => {
            handleClick('Item berhasil di Ceklist!');
            updateTodo();
          }}
        >
          {todo.task}
        </div>
      )}
      <span className="edit">{!isEditing && <i className="pensil fa-solid fa-pen" onClick={handleEdit}></i>}</span>
      <span
        className="close"
        onClick={() => {
          handleClick('Item berhasil di Hapus!');
          deleteTodo();
        }}
      >
        <i className="sampah fa-solid fa-trash"></i>
      </span>
    </li>
  );
};

export default TodoItem;
