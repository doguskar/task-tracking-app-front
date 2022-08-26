import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function TaskForm(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskListId, setTaskListId] = useState('');

    const postForm = () => {
        const newTask = { title, description }
        props.handleClose();
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Add Task {props.currentTask.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => props.postAddTask({ title, description, taskListId })}>
                    Save
                </Button>
                <Button variant="secondary" onClick={() => setTitle(props.currentTask.title)}>
                    set
                </Button>
            </Modal.Footer>
        </>
    )
}
