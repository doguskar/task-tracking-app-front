import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Task(props) {

    return (
        <div>
            {props.taskList.tasks.map(task => (
                <Card.Body key={task.id}>
                    <Card>
                        <Card.Body>
                            <div style={{ position: "absolute", zIndex: "1" }}>
                                {[DropdownButton].map((DropdownType, idx) => (
                                    <DropdownType
                                        as={ButtonGroup}
                                        key={idx}
                                        id={`dropdown-button-drop-${idx}`}
                                        size="sm"
                                        variant="secondary"
                                        title=""
                                    >
                                        {props.taskLists.filter(taskListInner => taskListInner.id != props.taskList.id).map(taskListInner => (
                                            <Dropdown.Item eventKey={taskListInner.id} key={taskListInner.id} onClick={() => props.handlePush({ task, props, taskListInner })}>Push to {taskListInner.name}</Dropdown.Item>
                                        ))}
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="delete" onClick={() => props.handleDelete({ task, props })}>Delete</Dropdown.Item>
                                        <Dropdown.Item eventKey="edit" onClick={() => props.handleEdit({ task, props })}>Edit</Dropdown.Item>
                                    </DropdownType>
                                ))}
                            </div>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Assignee: Admin</Card.Subtitle>
                            <Card.Text>{task.description}</Card.Text>

                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" disabled>UP</Button>{' '}
                            <Button variant="secondary" disabled>DOWN</Button>
                        </Card.Footer>
                    </Card>
                </Card.Body>
            ))}
        </div>
    )
}
