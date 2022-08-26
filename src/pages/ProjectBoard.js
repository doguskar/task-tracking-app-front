import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserService from "../services/userService";
import TaskService from "../services/taskService";
import Task from "../layouts/Task";
import AddTaskForm from "../layouts/AddTaskForm";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ProjectBoard() {

    const [project, setProject] = useState([]);
    const [taskLists, setTaskLists] = useState([]);
    const [currnetTaskListId, setCurrnetTaskListId] = useState([]);
    const [currnetTask, setCurrnetTask] = useState([]);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        let userService = new UserService();
        userService.getAdminUser()
            .then(function (result) {
                console.log(result.data)
                setProject(result.data.projects[0])
                setTaskLists(result.data.projects[0].taskLists)
            });
    }, [counter]);

    const handleAddTask = (e) => {
        setCurrnetTaskListId(e.taskList.id)
        setShow(true)
    };

    const postAddTask = (e) => {
        let taskService = new TaskService();
        e.projectId = project.id
        e.taskListId = currnetTaskListId
        taskService.post(e)
            .then(function (response) {
                console.log(response);
                setCounter({ counter })
            })
            .catch(function (error) {
                console.log(error);
            });
        setShow(false)
    };

    const patchTask = (e) => {
        let taskService = new TaskService();
        const update = {}
        update.projectId = project.id
        update.taskListId = currnetTask.props.taskList.id
        currnetTask.task.title = title
        currnetTask.task.description = description
        update.task = currnetTask.task
        console.log(update)
        taskService.patch(update)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setShowUpdateModal(false)
    };

    const handleEditTask = (e) => {
        setCurrnetTask(e)
        setTitle(e.task.title)
        setDescription(e.task.description)
        setShowUpdateModal(true)
    };

    const handleDeleteTask = (e) => {
        let taskService = new TaskService();
        console.log(e)
        e.projectId = project.id
        e.taskListId = e.props.taskList.id
        taskService.delete(e)
            .then(function (response) {
                setCounter({ counter })
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handlePushTask = (e) => {
        let taskService = new TaskService();
        const update = {}
        console.log(e)
        update.projectId = project.id
        update.taskListId = e.props.taskList.id
        update.task = e.task
        update.task.taskListId = e.taskListInner.id
        console.log(update)
        taskService.patch(update)
            .then(function (response) {
                console.log(response);
                setCounter({ counter })
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Container>
            <Row>
                {taskLists.map(taskList => (
                    <Col sm key={taskList.id}>
                        <Card>
                            <div style={{ position: "absolute", zIndex: "1", margin: "5px" }}>
                                {[DropdownButton].map((DropdownType, idx) => (
                                    <DropdownType
                                        as={ButtonGroup}
                                        key={idx}
                                        id={`dropdown-button-drop-${idx}`}
                                        size="sm"
                                        variant="secondary"
                                        title=""
                                    >
                                        <Dropdown.Item eventKey="1" onClick={() => handleAddTask({ taskList })}>Add Task</Dropdown.Item>
                                    </DropdownType>
                                ))}
                            </div>
                            <Card.Header>{taskList.name}</Card.Header>
                            <Card.Body>
                                <Task taskList={taskList} taskLists={taskLists} projectId={project.id} handleEdit={handleEditTask} handleDelete={handleDeleteTask} handlePush={handlePushTask} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Modal show={show} onHide={handleClose}>
                    <AddTaskForm handleClose={handleClose} postAddTask={postAddTask} />
                </Modal>
                <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Task</Modal.Title>
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
                        <Button variant="secondary" onClick={() => handleCloseUpdateModal()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => patchTask()}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container>

    )
}
