import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const Header = ({ setRefresh }) => {
  const handleClick = (title) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const [task, settask] = useState('');

  // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
  const addTodo = () => {
    const newTodo = { task, complete: false };

    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string
      settask('');
      setRefresh(true);
    });
  };

  console.log(settask);
  return (
    <>
      <Container className="mt-2">
        <Row className="header">
          <div id="todo-header">
            <h2>TodoList</h2>
            <input type="text" value={task} onChange={(e) => settask(e.target.value)} placeholder="Add Todo..." />
            <span
              className="add-button"
              onClick={() => {
                handleClick('Item berhasil ditambahkan!');
                addTodo();
              }}
            >
              Add
            </span>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Header;
