import React, { Component } from 'react';
import { Container, Button, Modal, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios'

class Addbook extends Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            bookname: '',
            classname: '',
            classnumber: '',
            price: '',
            description: '',
            imagelink: '',
            condition: '',
            addbookerr: ''
        }

        this.handleBookNameChange = this.handleBookNameChange.bind(this)
        this.handleClassNameChange = this.handleClassNameChange.bind(this)
        this.handleClassNumberChange = this.handleClassNumberChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleImageLinkChange = this.handleImageLinkChange.bind(this)
        this.handleConditionChange = this.handleConditionChange.bind(this)
    }

    handleClose() { 
        this.setState({show: false})
    }
    handleShow()  { 
        this.setState({show: true})
    }

    handleBookNameChange(event) {
        this.setState({bookname: event.target.value})
    }

    handleClassNameChange(event) {
        this.setState({classname: event.target.value})
    }

    handleClassNumberChange(event) {
        this.setState({classnumber: event.target.value})
    }

    handlePriceChange(event) {
        this.setState({price: event.target.value})
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }

    handleImageLinkChange(event) {
        this.setState({imagelink: event.target.value})
    }

    handleConditionChange(event) {
        this.setState({condition: event.target.value})
    }

    renderTooltip(props) {
        return (
          <Tooltip id="button-tooltip" {...props}>
            Please make sure to copy correct image address, or it could cause problems in displaying the image.
          </Tooltip>
        );
    }

    addBook(name, classname, classnumber, price, condition, description, imagelink) {
        const config = {
            headers: { Authorization: `Bearer ${this.props.token}` }
        };

        console.log(this.props.token)

        if(!name || !classname || !classnumber || !price || !condition || !description || !imagelink){
            this.setState({addbookerr: 'all the fields are required, please fill all of them'})
        }else{
            this.setState({addbookerr: 'l o a d i n g . . . .'})

            const userdata = {name: name, classname: classname, classnumber: classnumber,price: price, condition: condition, description: description, imagelink: imagelink}

            axios.post(`https://spartanbooks-api.herokuapp.com/book`, userdata ,config )
            .then(res => {
                this.setState({addbookerr: 'Success'})
                this.setState({show: false})
                this.setState({addbookerr: ''})
                this.props.bookRefresh()
                this.setState({bookname: '',
                classname: '',
                classnumber: '',
                price: '',
                description: '',
                imagelink: '',
                condition: ''})
            }).catch(err => {
                this.setState({addbookerr: 'there seems to be a problem adding the book'})
                console.log(err)
            })
        }
    }

    render(){
        return(
            <Container>
                <Button variant="primary" onClick={() => this.handleShow()} style={{height: '40px', width: '120px'}}>Add Book</Button>
                <Modal show={this.state.show} onHide={() => this.handleClose()} size="lg">
                    <Modal.Header closeButton>
                        <h4>Fill the form to add book</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Book Name" value={this.state.bookname} onChange={this.handleBookNameChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Class Name" value={this.state.classname} onChange={this.handleClassNameChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="number" placeholder="Class Number" value={this.state.classnumber} onChange={this.handleClassNumberChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="number" placeholder="Price" value={this.state.price} onChange={this.handlePriceChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Book Condition" value={this.state.condition} onChange={this.handleConditionChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Book Description" as="textarea" rows="3" value={this.state.description} onChange={this.handleDescriptionChange}/>
                            </Form.Group>
                            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={this.renderTooltip}>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Book Image Link" value={this.state.imagelink} onChange={this.handleImageLinkChange}/>
                                </Form.Group>
                            </OverlayTrigger>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <h5>{this.state.addbookerr}</h5>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                    <Button variant="primary" onClick={() => this.addBook(this.state.bookname, this.state.classname, this.state.classnumber, this.state.price, this.state.condition, this.state.description, this.state.imagelink)}>
                        Add Book
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container> 
        );
    }
}

export default Addbook;