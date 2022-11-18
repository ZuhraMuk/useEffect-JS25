import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const UpdateTodo = ({ show, handleClose, oneEditTask, saveEditedTask }) => {
  const [editedTask, setEditedTask] = useState(oneEditTask.task);

  function handleSave() {
    if (!editedTask.trim()) {
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
    let editObj = {
      task: editedTask,
      id: oneEditTask.id,
    };
    saveEditedTask(editObj);
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            value={editedTask}
            onChange={(e) => {
              setEditedTask(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTodo;
