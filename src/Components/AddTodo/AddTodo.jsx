import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodo = ({ handleTask }) => {
  const [inpTask, setInpTask] = useState("");

  // state <==== setState ====> React

  function handleAdd() {
    if (!inpTask.trim()) {
      toast.error("Заполните поле", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    let newTask = {
      task: inpTask,
      id: Date.now(),
    };
    handleTask(newTask);
    setInpTask("");
  }
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Task</InputGroup.Text>
        <Form.Control
          value={inpTask}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={(e) => setInpTask(e.target.value)}
        />
        <Button variant="success" onClick={handleAdd}>
          Add
        </Button>
      </InputGroup>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default AddTodo;
