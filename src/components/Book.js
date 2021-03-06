import React, { useState } from 'react';
import { Container, Card, Button, Modal, Col, Row, ListGroup} from 'react-bootstrap';

const Book = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userurl = "mailto:" + props.email

    return(
        <Container style={{marginTop: '20px'}}>
            <Card style={{ width: '18rem', height: 'auto' }}>
                <Card.Img variant="top" src={props.imagelink} style={{height: '300px', widht: '60px'}}/>
                <Card.Body>
                    {/* <Card.Title>Book Name</Card.Title> */}
                    <Card.Text>
                        {props.name},
                        Price: {props.price}$
                    </Card.Text>
                    <Button variant="dark" onClick={handleShow}>Buy Book</Button>
                </Card.Body>
            </Card> 
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <h4>Book Information</h4>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col><Card.Img variant="top" src={props.imagelink} style={{height: '400px', width: '340px'}}/></Col>
                        <Col>
                            <ListGroup>
                                <ListGroup.Item variant="primary">Book Name: {props.name}</ListGroup.Item>
                                <ListGroup.Item>Price: {props.price}$</ListGroup.Item>
                                <ListGroup.Item>Class Name/ Number: {props.classname}/{props.classnumber}</ListGroup.Item>
                                <ListGroup.Item>Condition: {props.condition}</ListGroup.Item>
                                <ListGroup.Item>Book Description: {props.description}</ListGroup.Item>
                                <ListGroup.Item>Seller Email: {props.email}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                <Button variant="success" href={userurl} target="_blank">
                    Email Seller
                </Button>
                </Modal.Footer>
            </Modal>
        </Container> 
    );
}

export default Book;