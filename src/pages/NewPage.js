import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const Header = () => {
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

  const addTodo = () => {
    const newTodo = { task, complete: false };

    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      settask('');
    });
  };

  console.log(settask);
  return (
    <>
      <Container className="mt-2">
        <Row className="header">
          <div id="todo-header">
            <h2>TodoInput</h2>
            <input type="text" value={task} onChange={(e) => settask(e.target.value)} placeholder="Input" />
            <span
              className="add-button"
              onClick={() => {
                
                addTodo();
              }}
            >
              Add
            </span>
          </div>
        </Row>

        <Row>
          <Col className="col-5"></Col>
          <Col>
            <Link to="/">
              <span className="add-back">Back</span>
            </Link>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
